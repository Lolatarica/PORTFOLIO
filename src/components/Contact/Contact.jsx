import './Contact.css';
import oldMonitorScreen from '../../assets/img_contacto/prueba 4.png';

export default function Contact() {
	return (
		<section id="contacto" className="contact-old-screen" aria-label="Contacto visual pantalla antigua">
			<div className="contact-old-screen__frame">
				<img
					src={oldMonitorScreen}
					alt="Pantalla de monitor antiguo"
					className="contact-old-screen__image"
				/>
				<div className="contact-old-screen__scanlines" aria-hidden="true" />
				<div className="contact-old-screen__noise" aria-hidden="true" />
				<div className="contact-old-screen__vignette" aria-hidden="true" />
			</div>
		</section>
	);
}
