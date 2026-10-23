import { useState } from 'react';
import './Contact.css';
import SnakeGame from './SnakeGame';
import carcasaImg from '../../assets/img_contacto/pc/carcasa.webp';
import pantallaOffImg from '../../assets/img_contacto/pc/pantalla_off.webp';
import pantallaOnImg from '../../assets/img_contacto/pc/pantalla_on.webp';
import mailImg from '../../assets/img_contacto/pc/mail.webp';
import fotoImg from '../../assets/img_contacto/pc/btn_sobremi.webp';
import iconoCv from '../../assets/img_contacto/pc/icono_cv.png';
import iconoLinkedin from '../../assets/img_contacto/pc/icono_linkedin.png';
import iconoIg from '../../assets/img_contacto/pc/icono_ig.png';

// ── Datos de contacto: completar ──
const CONTACT = {
	instagram: '#', // ej: https://instagram.com/usuario
	linkedin: '#', // ej: https://www.linkedin.com/in/usuario
	cv: '#', // ej: import del PDF o '/PORTFOLIO/CV_Lola_Tarica.pdf'
};

// Clave de Web3Forms (https://web3forms.com). Vacía = el envío se simula.
const FORM_ACCESS_KEY = '';

// Posiciones medidas sobre el PSD, en px de la carcasa (975 × 1010).
// Los íconos se ubican por su centro, relativo a la pantalla encendida.
const desktopIcons = [
	{ label: 'CV_Lola.pdf', img: iconoCv, href: CONTACT.cv, w: 36, cx: 61.5, cy: 319.5, download: true },
	{ label: 'LinkedIn', img: iconoLinkedin, href: CONTACT.linkedin, w: 41, cx: 60, cy: 387 },
	{ label: 'Instagram', img: iconoIg, href: CONTACT.instagram, w: 40, cx: 59.5, cy: 452.5 },
];

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// Duraciones de las barras de carga (ms)
const CONNECTING_MS = 1600;
const FILL_MS = 1700;

const sendMessage = async (data) => {
	if (!FORM_ACCESS_KEY) {
		await wait(1200);
		console.info('[Contacto] Envío simulado (falta FORM_ACCESS_KEY):', data);
		return;
	}
	const res = await fetch('https://api.web3forms.com/submit', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
		body: JSON.stringify({ access_key: FORM_ACCESS_KEY, ...data }),
	});
	const json = await res.json();
	if (!json.success) throw new Error(json.message);
};

export default function Contact() {
	// off → booting → on → shutting → off
	const [power, setPower] = useState('off');
	// idle | connecting | sending | done | sent | error
	const [sendState, setSendState] = useState('idle');
	const isBusy = ['connecting', 'sending', 'done'].includes(sendState);
	const [isSnakeOpen, setIsSnakeOpen] = useState(false);

	const isOn = power === 'on' || power === 'booting';

	const togglePower = () => {
		if (power === 'off') setPower('booting');
		if (power === 'on') {
			setSendState('idle');
			setIsSnakeOpen(false);
			setPower('shutting');
		}
	};

	// Sticker de la serpiente: abre el Snake (y prende la compu si está apagada)
	const openSnake = () => {
		if (power === 'off') setPower('booting');
		if (power === 'shutting') return;
		setIsSnakeOpen(true);
	};

	const handleScreenAnimationEnd = () => {
		if (power === 'booting') setPower('on');
		if (power === 'shutting') setPower('off');
	};

	const goToAbout = (e) => {
		e.preventDefault();
		document.querySelector('#sobre-mi')?.scrollIntoView({ behavior: 'smooth' });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const form = e.currentTarget;
		const data = Object.fromEntries(new FormData(form));
		// El envío real corre en paralelo a las dos barras:
		// primero "conectando" (bloques que recorren), después la barra que se llena.
		const request = sendMessage({ ...data, subject: data.subject || 'Mensaje desde el portfolio' });
		request.catch(() => {});
		setSendState('connecting');
		try {
			await wait(CONNECTING_MS);
			setSendState('sending');
			await Promise.all([request, wait(FILL_MS)]);
			setSendState('done');
			await wait(350);
			form.reset();
			setSendState('sent');
			setTimeout(() => setSendState((s) => (s === 'sent' ? 'idle' : s)), 5000);
		} catch {
			setSendState('error');
		}
	};

	return (
		<section id="contacto" className="contact" aria-label="Contacto">
			<div className={`pc pc--${power}`}>
				<img className="pc__screen-off" src={pantallaOffImg} alt="" />

				{power !== 'off' && (
					<div
						className={`pc__screen pc__screen--${power}`}
						onAnimationEnd={(e) => e.target === e.currentTarget && handleScreenAnimationEnd()}
					>
						<img className="pc__wallpaper" src={pantallaOnImg} alt="" />

						{desktopIcons.map((icon) => (
							<a
								key={icon.label}
								className="pc__icon"
								href={icon.href}
								target={icon.download ? undefined : '_blank'}
								rel="noopener noreferrer"
								download={icon.download || undefined}
								style={{ '--cx': icon.cx, '--cy': icon.cy, '--w': icon.w }}
							>
								<img src={icon.img} alt="" />
								<span>{icon.label}</span>
							</a>
						))}

						<form className="pc__mail" onSubmit={handleSubmit}>
							<img className="pc__mail-bg" src={mailImg} alt="" />
							<button type="submit" className="pc__mail-send" disabled={isBusy}>
								Enviar
							</button>
							<div className="pc__mail-labels" aria-hidden="true">
								<span>Nombre:</span>
								<span>Mail:</span>
								<span>Asunto:</span>
							</div>
							<input className="pc__mail-field pc__mail-field--name" name="name" aria-label="Nombre" required autoComplete="name" />
							<input className="pc__mail-field pc__mail-field--email" name="email" type="email" aria-label="Mail" required autoComplete="email" />
							<input className="pc__mail-field pc__mail-field--subject" name="subject" aria-label="Asunto" />
							<textarea className="pc__mail-body" name="message" aria-label="Mensaje" placeholder="Escribí tu mensaje..." required />
						</form>

						{isBusy && (
							<div className="xp-dialog" role="status">
								<div className="xp-dialog__title">Enviar y recibir</div>
								<div className="xp-dialog__content">
									<p>{sendState === 'connecting' ? 'Conectando con el servidor...' : 'Enviando mensaje a Lola...'}</p>
									<div className="xp-progress">
										{sendState === 'connecting' ? (
											<div className="xp-progress__marquee" />
										) : (
											<div
												className={`xp-progress__bar${sendState === 'done' ? ' xp-progress__bar--done' : ''}`}
												style={{ '--fill-ms': `${FILL_MS}ms` }}
											/>
										)}
									</div>
								</div>
							</div>
						)}

						{sendState === 'error' && (
							<div className="xp-dialog" role="alert">
								<div className="xp-dialog__title">Error</div>
								<div className="xp-dialog__content xp-dialog__content--row">
									<span className="xp-dialog__error-icon" aria-hidden="true">✕</span>
									<p>No se pudo enviar el mensaje. Revisá tu conexión o escribime por otra red.</p>
								</div>
								<button type="button" className="xp-button" onClick={() => setSendState('idle')}>
									Aceptar
								</button>
							</div>
						)}

						{isSnakeOpen && <SnakeGame onClose={() => setIsSnakeOpen(false)} />}

						{sendState === 'sent' && (
							<div className="xp-balloon" role="status">
								<strong>Mensaje enviado ✓</strong>
								<p>¡Gracias! Te respondo pronto.</p>
							</div>
						)}
					</div>
				)}

				{power === 'off' && (
					<button type="button" className="pc__hint" onClick={togglePower}>
						presioná para encender
					</button>
				)}

				<img className="pc__carcasa" src={carcasaImg} alt="Computadora retro con stickers" />

				<a className="pc__foto" href="#sobre-mi" onClick={goToAbout} aria-label="Ir a Sobre mí">
					<img src={fotoImg} alt="" />
				</a>

				<button
					type="button"
					className="pc__snake-sticker"
					onClick={openSnake}
					aria-label="Jugar Snake"
					data-tooltip="snake.exe"
				/>

				<span className={`pc__led${isOn ? ' pc__led--on' : ''}`} aria-hidden="true" />
				<button
					type="button"
					className="pc__power"
					onClick={togglePower}
					aria-label={isOn ? 'Apagar computadora' : 'Encender computadora'}
					aria-pressed={isOn}
				/>
			</div>
		</section>
	);
}
