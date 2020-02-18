import './ImageLinkForm.css';
import React from 'react';

const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => {
  return (
    <div>
      <p className="f3">{'Enter Link to detect faces in picture'}</p>
      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          <input
            onChange={e => onInputChange(e.target.value)}
            type="text"
            className="f4 w-70 pa2 center "
          />
          <button
            onClick={onPictureSubmit}
            className="w-30 f4 grow link ph3 pv2 dib bg-light-purple"
          >
            detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
