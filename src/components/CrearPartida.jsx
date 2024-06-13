import React from 'react';
import { useId, useState } from 'react';
import { LogoHome, LogoAtras } from './Icons';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Loader from './Loader';
import { UseUser } from '../hooks/UseUser';
import { useAxios } from '../context/axiosContext';
import Message from './Message';


export function CrearPartida() {
    const [loading, setLoading] = useState(false);
    const nivel = useId();
    const dificultad = useId();
    const asignatura = useId();
    const rondas = useId();
    const vidas = useId();
    const title = useId();
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const {user} = UseUser();
    const [error, setError] = useState();
    const axios = useAxios();

    const goBack = () => {
        navigate("/bienvenida");
    }

    const onSubmit = async (info) => {
        let infoParams = {};
        let completo = true;
        for (var param in info) {
            if (info[param] !== "mezcla") {
                infoParams[param] = info[param];
            }
            if(info[param] == ""){
                completo = false;
            }
            infoParams["idAdmin"] = user;
        }
        if(completo && info["numRondas"] > 0 && info["numVidas"] > 0){
            try {
                setLoading(true);
                const response = await axios.post("/create", null, {
                    params: infoParams
                });
                navigate("/bienvenida");
            } catch (e) {
                console.log(e);
                if (e.response && e.response.status === 400) {
                    setError("No hay suficientes preguntas para crear la partida.");
                } else {
                    setError("Ha ocurrido un error. Vuelve a intentarlo");
                }
            } finally {
                setLoading(false);
            }
        }else{
            setError("Debes de introducir todos los datos correctamente");
        }
    }
    return (
        <>
            {loading ? <Loader /> : (
                <section className="bg-violet-600 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(202,182,255,1),rgba(255,255,255,0))] h-screen overflow-auto">
                    <header className="flex justify-between font-titulo animate-flip-down animate-ease-in-out text-5xl text-center p-10 h-1/5 items-start">
                        <button className='w-10' onClick={goBack} >
                            <LogoAtras />
                        </button>
                        <div>
                            <h1>CREAR PARTIDA</h1>
                        </div>
                        <div className='w-10'>
                            <Link to="/"><LogoHome /></Link>
                        </div>
                    </header>
                    <main className='flex justify-center'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <main className='flex flex-col items-center gap-5'>
                            {error && (
                                <Message mensaje={error} setMensaje={setError} error={true}/>
                            )}
                            <div>
                                <label className='font-normal' htmlFor={title}>Título: </label><br />
                                <input max={20} className='p-3 h-10 w-96 rounded-lg focus:outline-none focus:ring-2 focus:ring-white' type="text" {...register("titulo")} id={title}  />
                            </div>
                            <div>
                                <label className='font-normal' htmlFor={nivel}>Nivel De Pregunta: </label><br />
                                <select
                                    className='h-10 w-96 rounded-lg focus:outline-none focus:ring-2 focus:ring-white'
                                    id={dificultad} {...register("nivel")}
                                    
                                >
                                    <option value="mezcla">Mezcla</option>
                                    <option value="1ESO">1 ESO</option>
                                    <option value="2ESO">2 ESO</option>
                                    <option value="3ESO">3 ESO</option>
                                    <option value="4ESO">4 ESO</option>
                                    <option value="1BACH">1 BACH</option>
                                    <option value="2BACH">2 BACH</option>
                                </select>
                            </div>
                            <div>
                                <label className='font-normal' htmlFor={dificultad}>Dificultad: </label><br />
                                <select
                                    className='h-10 w-96 rounded-lg focus:outline-none focus:ring-2 focus:ring-white'
                                    id={dificultad} {...register("dificultad")}
                                    
                                >
                                    <option value="mezcla">Mezcla</option>
                                    <option value="facil">Fácil</option>
                                    <option value="intermedia">Intermedia</option>
                                    <option value="dificil">Difícil</option>
                                </select>
                            </div>

                            <div>
                                <label className='font-normal' htmlFor={asignatura}>Asignatura: </label><br />
                                <select
                                    className='h-10 w-96 rounded-lg focus:outline-none focus:ring-2 focus:ring-white'
                                    id={dificultad} {...register("asignatura")}
                                    
                                >
                                    <option value="mezcla">Todo</option>
                                    <option value="Matematicas">Matematicas</option>
                                    <option value="Lengua">Lengua</option>
                                    <option value="Física">Física</option>
                                    <option value="Quimica">Quimica</option>
                                    <option value="Biologia">Biologia</option>
                                    <option value="Geología">Geología</option>
                                    <option value="Inglés">Inglés</option>
                                    <option value="Historia">Historia</option>
                                    <option value="Francés">Francés</option>
                                    <option value="Música">Música</option>
                                    <option value="Informatica">Informatica</option>
                                    <option value="Plástica">Plástica</option>
                                    <option value="Filosofía">Filosofía</option>
                                    <option value="Economía">Economía</option>
                                    <option value="Geografía">Geografía</option>
                                </select>
                            </div>
                            <div>
                                <label className='font-normal' htmlFor={rondas}>Rondas: </label><br />
                                <input className='p-3 h-10 w-96 rounded-lg focus:outline-none focus:ring-2 focus:ring-white' {...register("numRondas")} type="number" min={1} id={rondas}  />
                            </div>
                            <div>
                                <label className='font-normal' htmlFor={vidas}>Vidas: </label><br />
                                <input className='p-3 h-10 w-96 rounded-lg focus:outline-none focus:ring-2 focus:ring-white' type="number" {...register("numVidas")} min={1} id={vidas}  />
                            </div>
                            <div className='flex justify-center'>
                                <input type="submit" className="p-3 bg-white hover:animate-jump rounded-lg hover:cursor-pointer focus:ring-white font-normal mb-5" value="CREAR PARTIDA" />
                            </div>
                        </main>
                    </form>
                    </main>
                </section>
            )}
        </>
    );
}