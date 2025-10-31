import React, { useState } from 'react';
import './App.css';

function App() {
  const sampleWorks = [
    {
      id: 'w1',
      title: 'Ilustración - "Amanecer"',
      author: 'María Pérez',
      price: 35,
      category: 'Ilustración',
      img: 'ilustraciónAmanecer.jpg', 
      description: 'Ilustración digital inspirada en paisajes urbanos y colores cálidos.'
    },
    {
      id: 'w2',
      title: 'Mockup App - Foodies',
      author: 'J. Gómez',
      price: 60,
      category: 'Desarrollo',
      img: 'Mockup App - Foodies.jpg',
      description: 'Proyecto UI/UX de app de entregas con componentes reutilizables.'
    },
    {
      id: 'w3',
      title: 'Serie Fotográfica - Calle',
      author: 'L. Castro',
      price: 20,
      category: 'Fotografía',
      img: 'Serie Fotográfica - Calle.jpg', 
      description: 'Fotografías en blanco y negro que capturan escenas cotidianas.'
    }
  ];

  const [works, setWorks] = useState(sampleWorks);
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Todos');
  const [showUpload, setShowUpload] = useState(false);

  const categories = ['Todos', 'Ilustración', 'Desarrollo', 'Fotografía'];

  // Filtrar trabajos
  const filteredWorks = works.filter(w => {
    const matchQuery = (w.title + w.author + w.description).toLowerCase().includes(query.toLowerCase());
    const matchCategory = categoryFilter === 'Todos' || w.category === categoryFilter;
    return matchQuery && matchCategory;
  });

  // Subir trabajo nuevo
  function uploadWork(newWork) {
    setWorks(prev => [{ ...newWork, id: 'w' + (prev.length + 1) }, ...prev]);
    setShowUpload(false);
  }

  return (
    <div className="App">
      {/* 🔹 NAVBAR */}
      <header className="navbar">
        <div className="logo-area">
          <div className="logo">    
            <img src="/galera.png" alt="logo" height={100} width={100}/> 
          </div>
          <div>
            <h1>GALLERY SPACE</h1>
            <p>Tu marketplace estudiantil de creatividad</p>
          </div>
        </div>

        <div className="actions">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Buscar trabajos..."
          />
          <button onClick={() => setShowUpload(true)}>Publicar trabajo</button>
        </div>
      </header>

      {/* 🔹 HERO */}
      <section className="hero">
        <div className="hero-text">
          <h2>Expone, conecta y vende tus creaciones</h2>
          <p>Gallery Space impulsa a los estudiantes a mostrar y vender su talento creativo.</p>
          <div className="hero-buttons">
            <button onClick={() => setShowUpload(true)}>Comenzar</button>
            <a href="#catalogo">Ver trabajos</a>
          </div>
        </div>

        <div className="hero-img">
          <img src="certuss.png" alt="preview" />
        </div>
      </section>

      {/* CATÁLOGO */} 
      <main>
        <div className="filters">
          <label>Categoría:</label>
          <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <span>{filteredWorks.length} resultados</span>
        </div>

        <section id="catalogo" className="grid">
          {filteredWorks.map(work => (
            <div key={work.id} className="card">
              {/* 🔹 Imagen del trabajo */}
              <img src={work.img} alt={work.title} />
              <h3>{work.title}</h3>
              <p>{work.description}</p>
              <div className="card-footer">
                <span>${work.price}</span>
                <button>Ver más</button>
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* 🔹 MODAL DE SUBIDA */}
      {showUpload && (
        <UploadModal
          onClose={() => setShowUpload(false)}
          onUpload={uploadWork}
          categories={categories.filter(c => c !== 'Todos')}
        />
      )}

      {/* 🔹 FOOTER */}
      <footer>
        <p>© {new Date().getFullYear()} Gallery Space — Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

// 🔹 Modal simple para subir trabajos nuevos
function UploadModal({ onClose, onUpload, categories }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(categories[0] || '');
  const [img, setImg] = useState('');
  const [description, setDescription] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!title || !author || !price) return alert('Por favor, completa todos los campos.');
    onUpload({ title, author, price: Number(price), category, img, description });
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Publicar nuevo trabajo</h3>
        <form onSubmit={handleSubmit} className="form">
          <input type="text" placeholder="Título" value={title} onChange={e => setTitle(e.target.value)} />
          <input type="text" placeholder="Autor" value={author} onChange={e => setAuthor(e.target.value)} />
          <input type="number" placeholder="Precio (USD)" value={price} onChange={e => setPrice(e.target.value)} />
          <select value={category} onChange={e => setCategory(e.target.value)}>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <input type="text" placeholder="URL de imagen" value={img} onChange={e => setImg(e.target.value)} />
          <textarea placeholder="Descripción" value={description} onChange={e => setDescription(e.target.value)} />

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel">Cancelar</button>
            <button type="submit" className="publish">Publicar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
