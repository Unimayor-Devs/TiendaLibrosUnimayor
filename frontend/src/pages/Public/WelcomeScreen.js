import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaSignInAlt, FaUserPlus, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './Welcome.css'; // Importa el archivo de estilos CSS
import logo from './assets/logo.png'; // Importa el logo (asegúrate de tener el archivo logo.png en tu proyecto)
import carousel1 from './assets/background-image.jpg'; // Asegúrate de tener las imágenes correspondientes
import carousel2 from './assets/background-image.jpg';
import carousel3 from './assets/background-image.jpg';
import carousel4 from './assets/background-image.jpg';
import carousel5 from './assets/background-image.jpg';
import carousel6 from './assets/background-image.jpg'; // Asegúrate de tener las imágenes correspondientes
import carousel7 from './assets/background-image.jpg';
import carousel8 from './assets/background-image.jpg';
import carousel9 from './assets/background-image.jpg';
import carousel10 from './assets/background-image.jpg';

function WelcomeScreen() {
  const carouselRef = useRef(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="welcome-container">
      <header className="welcome-header">
        <div className="logo-container">
          <img src={logo} alt="Logo Unimayor" className="logo" />
          <h2>Tienda de Libros Unimayor</h2>
        </div>
        <div className="button-container">
          <Link className="welcome-button" to="/signin">
            <FaSignInAlt /> Iniciar sesión
          </Link>
          <Link className="welcome-button" to="/signup">
            <FaUserPlus /> Registrarse
          </Link>
        </div>
      </header>
      <main className="welcome-main">
        <section className="carousel-section">
          <h2>Descubre nuestros libros</h2>
          <div className="carousel-container">
            <button className="carousel-button left" onClick={scrollLeft}><FaArrowLeft /></button>
            <div className="carousel" ref={carouselRef}>
              <img src={carousel1} alt="Slide 1" className="carousel-image" />
              <img src={carousel2} alt="Slide 2" className="carousel-image" />
              <img src={carousel3} alt="Slide 3" className="carousel-image" />
              <img src={carousel4} alt="Slide 4" className="carousel-image" />
              <img src={carousel5} alt="Slide 5" className="carousel-image" />
              <img src={carousel6} alt="Slide 6" className="carousel-image" />
              <img src={carousel7} alt="Slide 7" className="carousel-image" />
              <img src={carousel8} alt="Slide 8" className="carousel-image" />
              <img src={carousel9} alt="Slide 9" className="carousel-image" />
              <img src={carousel10} alt="Slide 10" className="carousel-image" />
            </div>
            <button className="carousel-button right" onClick={scrollRight}><FaArrowRight /></button>
          </div>
        </section>
        <section className="articles-section">
          <h2>Libros que puedes comprar</h2>
          <div className="articles-container">
            <article className="article">
              <img src={carousel1} alt="Artículo 1" className="article-image" />
              <h3>Título del Artículo 1</h3>
              <p>Descripción breve del artículo 1.</p>
            </article>
            <article className="article">
              <img src={carousel2} alt="Artículo 2" className="article-image" />
              <h3>Título del Artículo 2</h3>
              <p>Descripción breve del artículo 2.</p>
            </article>
            <article className="article">
              <img src={carousel3} alt="Artículo 3" className="article-image" />
              <h3>Título del Artículo 3</h3>
              <p>Descripción breve del artículo 3.</p>
            </article>
            <article className="article">
              <img src={carousel4} alt="Artículo 4" className="article-image" />
              <h3>Título del Artículo 4</h3>
              <p>Descripción breve del artículo 4.</p>
            </article>
            <article className="article">
              <img src={carousel5} alt="Artículo 5" className="article-image" />
              <h3>Título del Artículo 5</h3>
              <p>Descripción breve del artículo 5.</p>
            </article>
          </div>
        </section>
        <section className="testimonials-section">
          <h2>Testimonios</h2>
          <div className="testimonials-container">
            <blockquote>
              <p>"Gran variedad de libros y excelente servicio. Muy recomendado!"</p>
              <footer>- Juan Pérez</footer>
            </blockquote>
            <blockquote>
              <p>"Me encanta la tienda de libros Unimayor, siempre encuentro lo que busco."</p>
              <footer>- María López</footer>
            </blockquote>
            <blockquote>
              <p>"Me encanta la tienda de libros Unimayor, siempre encuentro lo que busco."</p>
              <footer>- María López</footer>
            </blockquote>
            <blockquote>
              <p>"Me encanta la tienda de libros Unimayor, siempre encuentro lo que busco."</p>
              <footer>- María López</footer>
            </blockquote>
          </div>
        </section>
        <section className="contact-section">
          <h2>Contacto</h2>
          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input type="text" id="name" name="name" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>
              <input type="email" id="email" name="email" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Mensaje</label>
              <textarea id="message" name="message"></textarea>
            </div>
            <button type="submit" className="submit-button">Enviar</button>
          </form>
        </section>
        <section className="faq-section">
          <h2>Preguntas Frecuentes</h2>
          <div className="faq-container">
            <div className="faq-item">
              <h3>¿Cómo puedo registrarme?</h3>
              <p>Puedes registrarte haciendo clic en el botón "Registrarse" en la parte superior derecha.</p>
            </div>
            <div className="faq-item">
              <h3>¿Cuáles son los métodos de pago aceptados?</h3>
              <p>Aceptamos tarjetas de crédito, débito y pagos en efectivo en puntos autorizados.</p>
            </div>
          </div>
        </section>
      </main>
      <footer className="welcome-footer">
        <p>&copy; 2024 Tienda de Libros Unimayor. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default WelcomeScreen;