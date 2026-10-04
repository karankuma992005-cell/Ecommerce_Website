import { useState } from 'react';

export default function ProductGallery({ images, name }) {
  const [active, setActive] = useState(0);
  return (
    <div className="gallery">
      <div className="gallery__main">
        <img key={active} src={images[active]} alt={`${name} - view ${active + 1} of ${images.length}`} width="800" height="800" />
      </div>
      <ul className="gallery__thumbs" aria-label={`${name} image thumbnails`}>
        {images.map((src, index) => (
          <li key={src}>
            <button
              type="button"
              className={index === active ? 'is-active' : ''}
              onClick={() => setActive(index)}
              aria-pressed={index === active}
              aria-label={`Show image ${index + 1} of ${images.length}`}
            >
              <img src={src} alt="" loading="lazy" width="120" height="120" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
