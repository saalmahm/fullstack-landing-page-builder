import React, { useState } from 'react';

export default function ElementControls({ styles, onChange }) {
  const [position, setPosition] = useState(styles.position || 'relative');
  const [animation, setAnimation] = useState(styles.animation || 'none');
  const [fontSize, setFontSize] = useState(styles.fontSize || 16);
  const [fontWeight, setFontWeight] = useState(styles.fontWeight || 'normal');

  const animations = [
    { value: 'none', label: 'Aucune' },
    { value: 'fadeIn', label: 'Apparition douce' },
    { value: 'slideInLeft', label: 'Glissement de gauche' },
    { value: 'slideInRight', label: 'Glissement de droite' },
    { value: 'zoomIn', label: 'Zoom' },
  ];

  const positions = [
    { value: 'relative', label: 'Relatif' },
    { value: 'absolute', label: 'Absolu' },
    { value: 'fixed', label: 'Fixe' },
  ];

  const handlePositionChange = (e) => {
    const value = e.target.value;
    setPosition(value);
    onChange({ ...styles, position: value });
  };

  const handleAnimationChange = (e) => {
    const value = e.target.value;
    setAnimation(value);
    onChange({ ...styles, animation: value });
  };

  const handleFontSizeChange = (e) => {
    const value = parseInt(e.target.value);
    setFontSize(value);
    onChange({ ...styles, fontSize: value });
  };

  const handleFontWeightChange = (e) => {
    const value = e.target.value;
    setFontWeight(value);
    onChange({ ...styles, fontWeight: value });
  };

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow">
      <div>
        <label className="block mb-2">Position</label>
        <select
          value={position}
          onChange={handlePositionChange}
          className="w-full p-2 border rounded"
        >
          {positions.map((pos) => (
            <option key={pos.value} value={pos.value}>
              {pos.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-2">Animation</label>
        <select
          value={animation}
          onChange={handleAnimationChange}
          className="w-full p-2 border rounded"
        >
          {animations.map((anim) => (
            <option key={anim.value} value={anim.value}>
              {anim.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-2">Taille de police</label>
        <div className="flex items-center space-x-4">
          <input
            type="range"
            min={10}
            max={48}
            value={fontSize}
            onChange={handleFontSizeChange}
            className="w-full"
          />
          <input
            type="number"
            min={10}
            max={48}
            value={fontSize}
            onChange={handleFontSizeChange}
            className="w-16 p-1 border rounded"
          />
        </div>
      </div>

      <div>
        <label className="block mb-2">Épaisseur de police</label>
        <Select
          value={fontWeight}
          onChange={handleFontWeightChange}
          style={{ width: '100%' }}
        >
          <Option value="normal">Normal</Option>
          <Option value="bold">Gras</Option>
          <Option value="bolder">Plus gras</Option>
        </Select>
      </div>
    </div>
  );
}
