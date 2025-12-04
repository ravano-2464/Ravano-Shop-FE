import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import useProducts from '../hooks/Products/useProducts';

const useStyles = createUseStyles({
  page: {
    backgroundColor: '#F9FAFB',
    minHeight: 'calc(100vh - 73px)',
    padding: '3rem 1rem',
    display: 'flex',
    justifyContent: 'center',
  },
  container: {
    width: '100%',
    maxWidth: '1000px',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '1.5rem',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
    border: '1px solid #E5E7EB',
    overflow: 'hidden',
  },
  header: {
    padding: '2.5rem',
    borderBottom: '1px solid #F3F4F6',
  },
  title: {
    fontSize: '1.875rem',
    fontWeight: '800',
    color: '#111827',
    marginBottom: '0.5rem',
  },
  subtitle: { color: '#6B7280' },
  formBody: {
    padding: '2.5rem',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '3rem',
    '@media (min-width: 768px)': { gridTemplateColumns: '1.5fr 1fr' },
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    marginBottom: '1.5rem',
  },
  rowGroup: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#374151',
  },
  requiredStar: {
    color: '#EF4444',
    marginLeft: '3px',
    fontWeight: 'bold',
  },
  input: {
    padding: '0.875rem',
    borderRadius: '0.75rem',
    border: '1px solid #D1D5DB',
    fontSize: '1rem',
    outline: 'none',
    transition: 'all 0.2s',
    '&:focus': {
      borderColor: '#4F46E5',
      boxShadow: '0 0 0 4px rgba(79, 70, 229, 0.1)',
    },
  },
  select: {
    padding: '0.875rem',
    borderRadius: '0.75rem',
    border: '1px solid #D1D5DB',
    fontSize: '1rem',
    outline: 'none',
    backgroundColor: 'white',
    cursor: 'pointer',
    '&:focus': {
      borderColor: '#4F46E5',
      boxShadow: '0 0 0 4px rgba(79, 70, 229, 0.1)',
    },
  },
  textarea: {
    minHeight: '120px',
    resize: 'vertical',
    fontFamily: 'inherit',
    padding: '0.875rem',
    borderRadius: '0.75rem',
    border: '1px solid #D1D5DB',
    outline: 'none',
    fontSize: '1rem',
    '&:focus': {
      borderColor: '#4F46E5',
      boxShadow: '0 0 0 4px rgba(79, 70, 229, 0.1)',
    },
  },
  previewCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: '1rem',
    padding: '1.5rem',
    border: '1px solid #E5E7EB',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  previewLabel: {
    fontSize: '0.75rem',
    fontWeight: '700',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    marginBottom: '1rem',
    width: '100%',
    textAlign: 'left',
  },
  imageBox: {
    width: '100%',
    aspectRatio: '1',
    backgroundColor: 'white',
    borderRadius: '0.75rem',
    border: '2px dashed #E5E7EB',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1.5rem',
    overflow: 'hidden',
    position: 'relative',
  },
  previewImg: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    padding: '1rem',
  },
  placeholder: { color: '#D1D5DB', fontSize: '0.875rem' },
  footer: {
    padding: '1.5rem 2.5rem',
    backgroundColor: '#F9FAFB',
    borderTop: '1px solid #E5E7EB',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '1rem',
  },
  btn: {
    padding: '0.75rem 1.5rem',
    borderRadius: '0.5rem',
    fontWeight: '600',
    cursor: 'pointer',
    border: 'none',
    fontSize: '1rem',
  },
  btnCancel: {
    backgroundColor: 'white',
    border: '1px solid #D1D5DB',
    color: '#374151',
    '&:hover': { backgroundColor: '#F3F4F6' },
  },
  btnSubmit: {
    backgroundColor: '#4F46E5',
    color: 'white',
    '&:hover': { backgroundColor: '#4338CA' },
    '&:disabled': { opacity: 0.7, cursor: 'not-allowed' },
  },
  spinner: {
    width: '2.5rem',
    height: '2.5rem',
    border: '3px solid #E5E7EB',
    borderTop: '3px solid #4F46E5',
    borderRadius: '50%',
    animation: '$spin 1s linear infinite',
  },
  '@keyframes spin': {
    to: { transform: 'rotate(360deg)' },
  },
  errorText: {
    color: '#EF4444',
    fontWeight: '600',
    fontSize: '0.875rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
});

const ProductEdit = () => {
  const { id } = useParams();
  const classes = useStyles();
  const navigate = useNavigate();
  const { formData, handleChange, handleSubmit, loading, t } = useProducts(id);

  const [imgState, setImgState] = useState({ loading: false, error: false });
  const [prevImageUrl, setPrevImageUrl] = useState(formData.imageUrl);

  if (formData.imageUrl !== prevImageUrl) {
    setPrevImageUrl(formData.imageUrl);
    setImgState({
      loading: !!formData.imageUrl,
      error: false,
    });
  }

  if (loading && !formData.name) return <div>{t.list.loading}</div>;

  return (
    <div className={classes.page}>
      <div className={classes.container}>
        <form onSubmit={handleSubmit} className={classes.card}>
          <div className={classes.header}>
            <h1 className={classes.title}>{t.form.titleEdit}</h1>
            <p className={classes.subtitle}>
              {t.form.subtitleEdit} {id}
            </p>
          </div>

          <div className={classes.formBody}>
            <div className="left-col">
              <div className={classes.inputGroup}>
                <label className={classes.label}>
                  {t.form.name}
                  <span className={classes.requiredStar}>*</span>
                </label>
                <input
                  name="name"
                  className={classes.input}
                  placeholder={t.form.placeholderName}
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={classes.rowGroup}>
                <div className={classes.inputGroup}>
                  <label className={classes.label}>
                    {t.form.price}
                    <span className={classes.requiredStar}>*</span>
                  </label>
                  <input
                    name="price"
                    className={classes.input}
                    placeholder="0"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={classes.inputGroup}>
                  <label className={classes.label}>
                    Stock <span className={classes.requiredStar}>*</span>
                  </label>
                  <input
                    type="text"
                    name="stock"
                    className={classes.input}
                    placeholder="0"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className={classes.inputGroup}>
                <label className={classes.label}>
                  {t.form.visibilityLabel}{' '}
                  <span className={classes.requiredStar}>*</span>
                </label>
                <select
                  name="visibility"
                  className={classes.select}
                  value={formData.visibility}
                  onChange={handleChange}
                >
                  <option value="public">{t.form.publicOption}</option>
                  <option value="private">{t.form.privateOption}</option>
                </select>
              </div>

              <div className={classes.inputGroup}>
                <label className={classes.label}>{t.form.image}</label>
                <input
                  name="imageUrl"
                  className={classes.input}
                  placeholder="https://..."
                  value={formData.imageUrl}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={classes.inputGroup}>
                <label className={classes.label}>{t.form.desc}</label>
                <textarea
                  name="description"
                  className={classes.textarea}
                  placeholder={t.form.placeholderDesc}
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={classes.previewCard}>
              <div className={classes.previewLabel}>{t.form.preview}</div>
              <div className={classes.imageBox}>
                {!formData.imageUrl ? (
                  <span className={classes.placeholder}>
                    {t.form.imagePreview}
                  </span>
                ) : (
                  <>
                    {imgState.loading && <div className={classes.spinner} />}
                    {imgState.error && !imgState.loading && (
                      <span className={classes.errorText}>No Image</span>
                    )}
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className={classes.previewImg}
                      style={{
                        display:
                          imgState.loading || imgState.error ? 'none' : 'block',
                      }}
                      onLoad={() =>
                        setImgState({ loading: false, error: false })
                      }
                      onError={() =>
                        setImgState({ loading: false, error: true })
                      }
                    />
                  </>
                )}
              </div>
              <h3>{formData.name || 'Product Name'}</h3>
              <p style={{ color: '#4F46E5', fontWeight: 'bold' }}>
                Rp {formData.price || '0'}
              </p>
              <div
                style={{
                  marginTop: '0.5rem',
                  fontSize: '0.8rem',
                  color: '#6B7280',
                }}
              >
                Stock: {formData.stock || 0} | {t.common[formData.visibility]}
              </div>
            </div>
          </div>

          <div className={classes.footer}>
            <button
              type="button"
              onClick={() => navigate('/list-products')}
              className={`${classes.btn} ${classes.btnCancel}`}
            >
              {t.form.cancel}
            </button>
            <button
              type="submit"
              className={`${classes.btn} ${classes.btnSubmit}`}
            >
              {t.form.save}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductEdit;
