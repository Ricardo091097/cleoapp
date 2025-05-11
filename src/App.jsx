// App.jsx
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from 'react-router-dom';
import VideoModal from './components/VideoModal';
import CardGrid from './components/CardGrid';
import ProgressBar from './components/ProgressBar';

function Inicio() {
  const [mainVideoOpen, setMainVideoOpen] = useState(false);
  const navigate = useNavigate();

  const handleStart = () => setMainVideoOpen(true);
  const handleMainVideoClose = () => navigate('/recuerdos');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-100 to-white">
      <button onClick={handleStart} className="px-8 py-4 bg-indigo-600 text-white rounded-2xl text-2xl shadow-lg hover:bg-indigo-700">
        Iniciar
      </button>
      {mainVideoOpen && (
        <VideoModal
          videoUrl="/videos/inicio.mp4"
          onClose={handleMainVideoClose}
        />
      )}
    </div>
  );
}

function FinalCita() {
  const [showModal, setShowModal] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [accessGranted, setAccessGranted] = useState(false);
  const [error, setError] = useState(false);
  const [countdown, setCountdown] = useState('');
  const [showFinalVideo, setShowFinalVideo] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const target = new Date();
      target.setFullYear(now.getFullYear(), 4, 12); // Mayo es mes 4 (0-indexed)
      target.setHours(18, 30, 0, 0);

      const diff = target - now;
      if (diff <= 0) {
        setCountdown('¡Es la hora!');
        clearInterval(timer);
      } else {
        const h = Math.floor(diff / 1000 / 60 / 60);
        const m = Math.floor((diff / 1000 / 60) % 60);
        const s = Math.floor((diff / 1000) % 60);
        setCountdown(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-100 flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-xl w-full">
        <h1 className="text-5xl font-bold mb-4 text-purple-700">Cita</h1>
        <p className="text-3xl font-mono mb-8 text-gray-800">{countdown}</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => setShowFinalVideo(true)}
            className="px-6 py-3 bg-indigo-600 text-white rounded-2xl text-lg hover:bg-indigo-700 shadow-md"
          >
            Ver video de nuevo
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-green-600 text-white rounded-2xl text-lg hover:bg-green-700 shadow-md"
          >
            Cita
          </button>
        </div>
      </div>

      {showFinalVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-md">
            <video src="/videos/final.mp4" controls autoPlay className="w-full rounded-lg" />
            <div className="p-4 text-right bg-gray-50">
              <button
                onClick={() => setShowFinalVideo(false)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-lg w-full text-left">
            {!accessGranted ? (
              <>
                <p className="mb-4 font-semibold text-gray-800">Este contenido es sólo para Cleo. Para asegurar que sólo Cleo vea el contenido debes ingresar la contraseña de mi celular.</p>
                <button
                  onClick={() => setShowHint(true)}
                  className="text-blue-600 underline mb-2 block font-medium"
                >
                  Ayuda
                </button>
                {showHint && (
                  <p className="text-sm text-gray-600 mb-4 italic">Cumpleaños de mi hermana 28mm98</p>
                )}
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    placeholder="Ingresa la contraseña"
                    value={inputValue}
                    onChange={e => {
                      setInputValue(e.target.value);
                      setError(false);
                    }}
                    className="px-4 py-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:border-purple-600 text-lg"
                  />
                  <button
                    onClick={() => {
                      if (inputValue === '280898') {
                        navigate('/ricky');
                      } else {
                        setError(true);
                      }
                    }}
                    className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-lg shadow-md"
                  >
                    Aceptar
                  </button>
                  {error && <span className="text-red-600 font-medium">Contraseña incorrecta</span>}
                </div>
              </>
            ) : null}
            <div className="text-right mt-6">
              <button onClick={() => setShowModal(false)} className="text-sm text-red-500 hover:underline font-medium">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



function RickyVideo() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col items-center" style={{ maxWidth: '50vw', width: '100%' }}>
        <video
          src="/videos/ricky.mp4"
          controls
          autoPlay
          className="w-full object-contain bg-black rounded-t-2xl"
        />
        <div className="p-6 text-justify text-gray-800 text-base leading-relaxed w-full">
          Después de ir con la nutrióloga fuimos a este lugar y prometimos regresar para probar más cosas deliciosas. Es un lugar fácil de encontrar, pero encontrar personas no es tan sencillo. 6:30 pm justo donde siempre hay más personas porque es el platillo más famoso. Si necesitas llegar más tarde puedes enviar un mensaje, pero no contestaré en ningún momento, sólo reaccionaré a tu mensaje. Nos vemos.
        </div>
      </div>
    </div>
  );
}



function Recuerdos() {
  const [videoModalUrl, setVideoModalUrl] = useState(null);
  const [viewedCards, setViewedCards] = useState([]);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const navigate = useNavigate();

  const cards = [
    { id: 1, label: '7 de febrero', image: '/img/feb7.jpg', video: '/videos/feb7.mp4' },
    { id: 2, label: '14 de febrero', image: '/img/feb14.jpg', video: '/videos/feb14.mp4' },
    { id: 3, label: '4 de Marzo', image: '/img/mar4.jpg', video: '/videos/mar4.mp4' },
    { id: 4, label: '13 de Marzo', image: '/img/mar13.jpg', video: '/videos/mar13.mp4' },
    { id: 5, label: '18 de Marzo', image: '/img/mar18.jpg', video: '/videos/mar18.mp4' },
    { id: 6, label: '29 de Abril', image: '/img/apr29.jpg', video: '/videos/apr29.mp4' },
    { id: 7, label: 'Shot time', image: '/img/shot.jpg', video: null },
    { id: 8, label: 'Baby time', image: '/img/baby.jpg', video: null }
  ];

  const handleCardClick = (id, videoUrl) => {
    if (!viewedCards.includes(id)) setViewedCards([...viewedCards, id]);

    if (id === 7 || id === 8) {
      setShowGalleryModal(true);
    } else {
      setVideoModalUrl(videoUrl);
    }
  };

  const handleVideoModalClose = () => {
    if (videoModalUrl === '/videos/final.mp4') {
      setVideoModalUrl(null);
      navigate('/final');
    } else {
      setVideoModalUrl(null);
    }
  };

  const progress = (viewedCards.length / cards.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white p-4 flex flex-col items-center">
      <CardGrid cards={cards} onCardClick={handleCardClick} />
      <ProgressBar progress={progress} />
      {progress === 100 && (
        <button
          onClick={() => setVideoModalUrl('/videos/final.mp4')}
          className="mt-6 px-6 py-3 bg-green-600 text-white rounded-xl text-xl shadow-md hover:bg-green-700"
        >
          ¿Qué hubiera sido?
        </button>
      )}

      {showGalleryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-xl shadow-2xl max-w-3xl w-full overflow-y-auto max-h-[90vh]">
            <div className="grid grid-cols-2 gap-4">
              <img src="/img/baby1.jpg" alt="" className="w-full h-auto rounded-md" />
              <img src="/img/baby2.jpg" alt="" className="w-full h-auto rounded-md" />
              <button onClick={() => setVideoModalUrl('/videos/babyextra.mp4')} className="bg-gray-200 p-4 rounded-md hover:bg-gray-300">Ver video</button>
              <button onClick={() => setVideoModalUrl('/videos/shotextra.mp4')} className="bg-gray-200 p-4 rounded-md hover:bg-gray-300">Ver video</button>
            </div>
            <div className="text-right mt-4">
              <button onClick={() => setShowGalleryModal(false)} className="text-sm text-red-500 hover:underline">Cerrar</button>
            </div>
          </div>
        </div>
      )}

      {videoModalUrl && (
        <VideoModal
          videoUrl={videoModalUrl}
          onClose={handleVideoModalClose}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/recuerdos" element={<Recuerdos />} />
        <Route path="/final" element={<FinalCita />} />
        <Route path="/ricky" element={<RickyVideo />} />
      </Routes>
    </Router>
  );
}