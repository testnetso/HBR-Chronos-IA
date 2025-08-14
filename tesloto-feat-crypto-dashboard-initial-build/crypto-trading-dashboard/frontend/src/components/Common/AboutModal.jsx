import React from 'react';
import { useTranslation } from 'react-i18next';

const AboutModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>&times;</button>
        <h2>{t('about_title')}</h2>
        <p className="modal-intro"><em>{t('about_intro')}</em></p>

        <h3>{t('about_how_it_works')}</h3>
        <ul>
          <li>{t('about_p1')}</li>
          <li>{t('about_p2')}</li>
          <li>{t('about_p3')}</li>
        </ul>

        <h3 style={{marginTop: '1.5rem'}}>{t('prob_table_title')}</h3>
        <table className="probability-table">
          <thead>
            <tr>
              <th>{t('prob_high')}</th>
              <th>{t('prob_medium')}</th>
              <th>{t('prob_low')}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{t('prob_high_desc')}</td>
              <td>{t('prob_medium_desc')}</td>
              <td>{t('prob_low_desc')}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AboutModal;
