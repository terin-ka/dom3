import React from 'react';
import Image from 'react-bootstrap/Image';
import md5 from 'md5';

export default function Gravatar({ email, size = 32, defaultImage = 'mp' }) {
  const hash = email != null ? md5(email.trim().toLowerCase()): 1;
  const gravatarUrl = `https://www.gravatar.com/avatar/${hash}?s=${size}&d=${defaultImage}`;

  return (
    <Image
      src={gravatarUrl}
      alt="Gravatar"
      roundedCircle
      style={{ width: `${size}px`}}
    />
  );
}

