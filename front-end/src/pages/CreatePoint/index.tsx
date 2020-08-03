import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import axios from 'axios';
import api from '../../services/api';

import Dropzone from '../../components/Dropzone';

import logo from '../../assets/logo.svg';
import './styles.css';

//quando criamos um estado para array ou objeto,
//precisamos criar uma 'interface' manualmente informando
// o tipo das variaveis que serão armazenadas.

interface Items {
    id: number;
    title: string;
    image_url: string;
};

interface IBGEUFResponse {
    id: number;
    sigla: string;
};

interface IBGECityResponse {
    id: number;
    nome: string;
};

const CreatePoint = () => {
    const [items, setItems] = useState<Items[]>([]);
    const [ufs, setUfs] = useState<IBGEUFResponse[]>([]);
    const [cities, setCities] = useState<IBGECityResponse[]>([]);
    const [formData, setFormData] = useState({ name: '', whatsapp: '', email: '', });
    const [selectedFile, setSelectedFile] = useState<File>();
    const [selectedUf, setSelectedUf] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');
    const [selectedItems, setSelectedItems] = useState<number[]>([])
    const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;

            setInitialPosition([latitude, longitude]);
        });
    }, []);

    useEffect(() => {
        api.get('/items').then(response => {
            setItems(response.data);
        }).catch(error => {

        });
    }, []);

    useEffect(() => {
        axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
            setUfs(response.data)
        }).catch(error => {

        });

    }, []);

    useEffect(() => {

        if (selectedUf === "0") {
            return;
        };

        axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
            .then(response => {
                setCities(response.data);
            }).catch(error => {

            });

    }, [selectedUf]);

    function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
        const uf = event.target.value;
        setSelectedUf(uf);
    };

    function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
        const city = event.target.value;
        setSelectedCity(city);
    };

    function handleMapClick(event: LeafletMouseEvent) {
        setSelectedPosition([
            event.latlng.lat,
            event.latlng.lng
        ]);
    };

    function handleSelectItems(id: number) {
        const alreadySelected = selectedItems.findIndex(item => item === id);

        if (alreadySelected >= 0) {
            const filteredItems = selectedItems.filter(item => item !== id);
            setSelectedItems(filteredItems);
        } else {
            setSelectedItems([...selectedItems, id]);
        };
    };

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const { name, email, whatsapp } = formData;
        const uf = selectedUf;
        const city = selectedCity;
        const [latitude, longitude] = selectedPosition;
        const items = selectedItems;

        const data = new FormData();

        data.append('name', name);
        data.append('email', email);
        data.append('whatsapp', whatsapp);
        data.append('uf', uf);
        data.append('city', city);
        data.append('latitude', String(latitude));
        data.append('longitude', String(longitude));
        data.append('items', items.join(','));

        if (selectedFile) {
            data.append('image', selectedFile);
        };

        const response = await api.post('/points', data);

        console.log(response);

        if (!response) {
            alert('erro');
        };

        alert('cadastrado')
    };

    return (
        <div id="page-create-point">
            <div className="content">
                <header>
                    <img src={logo} alt="ecoleta" />

                    <Link to="/">
                        <FiArrowLeft />
                    Voltar para home
                </Link>
                </header>
                <form onSubmit={handleSubmit}>
                    <h1>Cadastro do<br />
                    ponto de coleta</h1>

                    <Dropzone onFileUploaded={setSelectedFile} />

                    <fieldset>
                        <legend>
                            <h2>Dados</h2>
                        </legend>
                        <div className="field">
                            <label htmlFor="name">Nome da entidade</label>
                            <input type="text" name="name" id="name" onChange={handleInputChange} required />
                        </div>
                        <div className="field-group">
                            <div className="field">
                                <label htmlFor="email">E-mail</label>
                                <input type="email" name="email" id="email" onChange={handleInputChange} required />
                            </div>
                            <div className="field">
                                <label htmlFor="whatsapp">Whatsapp</label>
                                <input type="text" name="whatsapp" id="whatsapp" onChange={handleInputChange} required />
                            </div>
                        </div>
                    </fieldset>

                    <Map center={initialPosition} zoom={15} onclick={handleMapClick}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={selectedPosition} />
                    </Map>

                    <fieldset>
                        <legend>
                            <h2>Endereço</h2>
                            <span>Selecione o endereço no mapa</span>
                        </legend>
                        <div className="field-group">
                            <div className="field">
                                <label htmlFor="uf">Estado (UF)</label>
                                <select id="uf" name="uf" value={selectedUf} onChange={handleSelectUf} >
                                    <option>Selecione um estado</option>
                                    {ufs.map(uf => (
                                        <option key={uf.id} value={uf.id}>{uf.sigla}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="field">
                                <label htmlFor="city">Cidade</label>
                                <select id="city" name="city" value={selectedCity} onChange={handleSelectCity}>
                                    <option value="0">Selecione uma cidade</option>
                                    {cities.map(city => (
                                        <option key={city.id} value={city.id}>{city.nome}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>
                            <h2>Ítems de coleta</h2>
                            <span>Selecione um ou mais ítens abaixo</span>
                        </legend>
                        <ul className="items-grid">
                            {items.map(item => (
                                <li key={item.id} onClick={() => handleSelectItems(item.id)} className={selectedItems.includes(item.id) ? 'selected' : ''}>
                                    <img src={item.image_url} alt={item.title} />
                                    <span>{item.title}</span>
                                </li>
                            ))}
                        </ul>
                    </fieldset>

                    <button type="submit">
                        Cadastra ponto de coleta
                    </button>
                </form>
            </div>
        </div>
    );
};

export { CreatePoint };