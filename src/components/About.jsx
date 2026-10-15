import { useState } from 'react';
import { profile } from '../data/profile.js';
import Section from './Section.jsx';

export default function About() {
  // If the photo file is missing, drop it and let the text use the full width.
  const [showPhoto, setShowPhoto] = useState(Boolean(profile.photo));

  return (
    <Section id="about" index="01" title="About">
      <div className={`about ${showPhoto ? 'about--photo' : ''}`}>
        {showPhoto && (
          <figure className="portrait">
            <img
              src={profile.photo.src}
              alt={profile.photo.alt}
              width="768"
              height="1024"
              loading="lazy"
              decoding="async"
              onError={() => setShowPhoto(false)}
            />
          </figure>
        )}
        <div className="prose">
          {profile.about.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </Section>
  );
}
