import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { createUseStyles } from 'react-jss';
import { User, Mail, Wallet, Calendar, Camera, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import useAuth from '../hooks/Auth/useAuth';
import { useLanguage } from '../context/LanguageContext';

const useStyles = createUseStyles({
  page: {
    backgroundColor: '#F9FAFB',
    minHeight: 'calc(100vh - 73px)',
    padding: '2rem 1rem',
  },
  container: {
    width: '100%',
    maxWidth: '980px',
    margin: '0 auto',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '1rem',
    border: '1px solid #E5E7EB',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.04)',
    overflow: 'hidden',
  },
  header: {
    padding: '2rem',
    borderBottom: '1px solid #F3F4F6',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  avatar: {
    width: '72px',
    height: '72px',
    borderRadius: '50%',
    backgroundColor: '#EEF2FF',
    color: '#4F46E5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.25rem',
    fontWeight: '800',
    textTransform: 'uppercase',
    overflow: 'hidden',
    flexShrink: 0,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  title: {
    margin: 0,
    fontSize: '1.7rem',
    fontWeight: '800',
    color: '#111827',
  },
  subtitle: {
    margin: '0.4rem 0 0',
    color: '#6B7280',
  },
  loadingState: {
    padding: '2rem',
    color: '#6B7280',
    textAlign: 'center',
  },
  errorBox: {
    margin: '1rem 2rem 0',
    backgroundColor: '#FEF2F2',
    color: '#B91C1C',
    border: '1px solid #FECACA',
    borderRadius: '0.75rem',
    padding: '0.75rem 1rem',
    fontSize: '0.9rem',
  },
  content: {
    padding: '2rem',
    display: 'grid',
    gap: '1.5rem',
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '1rem',
    '@media (min-width: 768px)': {
      gridTemplateColumns: '1fr 1fr',
    },
  },
  infoCard: {
    border: '1px solid #E5E7EB',
    borderRadius: '0.85rem',
    padding: '1rem',
    display: 'flex',
    gap: '0.75rem',
    alignItems: 'flex-start',
    backgroundColor: '#FAFAFA',
  },
  iconWrap: {
    width: '36px',
    height: '36px',
    borderRadius: '0.6rem',
    backgroundColor: '#EEF2FF',
    color: '#4F46E5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  infoLabel: {
    fontSize: '0.8rem',
    color: '#6B7280',
    marginBottom: '0.2rem',
    textTransform: 'uppercase',
    letterSpacing: '0.02em',
  },
  infoValue: {
    fontSize: '0.95rem',
    color: '#111827',
    fontWeight: '600',
    wordBreak: 'break-word',
  },
  editSection: {
    borderTop: '1px solid #F3F4F6',
    paddingTop: '1.5rem',
  },
  editTitle: {
    margin: 0,
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#111827',
  },
  form: {
    marginTop: '1rem',
    display: 'grid',
    gap: '1rem',
    gridTemplateColumns: '1fr',
    '@media (min-width: 768px)': {
      gridTemplateColumns: '2fr 1fr',
    },
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#374151',
  },
  input: {
    width: '100%',
    padding: '0.75rem 0.9rem',
    borderRadius: '0.65rem',
    border: '1px solid #D1D5DB',
    backgroundColor: 'white',
    fontSize: '0.95rem',
    outline: 'none',
    '&:focus': {
      borderColor: '#4F46E5',
      boxShadow: '0 0 0 3px rgba(79, 70, 229, 0.12)',
    },
  },
  actions: {
    marginTop: '0.25rem',
    display: 'flex',
    justifyContent: 'flex-start',
  },
  saveBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: '#4F46E5',
    color: 'white',
    border: 'none',
    borderRadius: '0.7rem',
    padding: '0.75rem 1.1rem',
    fontWeight: '700',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#4338CA',
    },
    '&:disabled': {
      opacity: 0.7,
      cursor: 'not-allowed',
    },
  },
});

const Profile = () => {
  const classes = useStyles();
  const { user, updateUserData } = useAuth();
  const { t, language } = useLanguage();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [avatarErrorUrl, setAvatarErrorUrl] = useState('');
  const [formData, setFormData] = useState({
    profileImageUrl: '',
    age: '',
  });
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    let isActive = true;

    const fetchProfile = async () => {
      if (!user?.token) {
        if (isActive) {
          setError(t.profile.noSession);
          setLoading(false);
        }
        return;
      }

      try {
        setLoading(true);
        setError('');

        const { data } = await axios.get(`${BASE_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        if (isActive) {
          setProfile(data);
          setFormData({
            profileImageUrl: data.profileImageUrl || '',
            age: data.age ?? '',
          });
        }
      } catch (err) {
        if (isActive) {
          setError(err?.response?.data?.error || t.profile.loadError);
        }
      } finally {
        if (isActive) setLoading(false);
      }
    };

    fetchProfile();

    return () => {
      isActive = false;
    };
  }, [BASE_URL, user?.token, t.profile.noSession, t.profile.loadError]);

  const locale = language === 'id' ? 'id-ID' : 'en-US';
  const profileData = profile || user || {};
  const userId = profileData?._id || profileData?.id || '-';
  const createdAt = profileData?.createdAt || profileData?.created_at;
  const updatedAt = profileData?.updatedAt || profileData?.updated_at;

  const initials = useMemo(() => {
    const source = profileData?.name || 'U';
    return source
      .split(' ')
      .filter(Boolean)
      .map((word) => word[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }, [profileData?.name]);

  const avatarUrl = (formData.profileImageUrl || profileData?.profileImageUrl || '').trim();
  const hasAvatar = Boolean(avatarUrl) && avatarErrorUrl !== avatarUrl;

  const formatDate = (value) => {
    if (!value) return '-';
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return '-';
    return parsed.toLocaleString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatBalance = (value) => {
    const amount = Number(value || 0);
    return `Rp ${amount.toLocaleString(locale)}`;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async (event) => {
    event.preventDefault();

    if (!user?.token) {
      setError(t.profile.noSession);
      return;
    }

    const normalizedAge =
      formData.age === '' || formData.age === null ? null : Number(formData.age);

    if (
      normalizedAge !== null &&
      (!Number.isInteger(normalizedAge) || normalizedAge < 1 || normalizedAge > 120)
    ) {
      toast.error(t.profile.invalidAge, { id: 'profile-invalid-age' });
      return;
    }

    const payload = {
      profileImageUrl: formData.profileImageUrl.trim(),
      age: normalizedAge,
    };

    try {
      setIsSaving(true);
      const { data } = await axios.put(`${BASE_URL}/auth/profile`, payload, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      setProfile(data);
      setFormData({
        profileImageUrl: data.profileImageUrl || '',
        age: data.age ?? '',
      });
      updateUserData(data);
      toast.success(t.profile.saveSuccess, { id: 'profile-save-success' });
    } catch (err) {
      const errMsg = err?.response?.data?.error || t.profile.loadError;
      setError(errMsg);
      toast.error(errMsg, { id: 'profile-save-error' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={classes.page}>
      <div className={classes.container}>
        <div className={classes.card}>
          <div className={classes.header}>
            <div className={classes.avatar}>
              {hasAvatar ? (
                <img
                  src={avatarUrl}
                  alt={profileData?.name || 'Profile'}
                  className={classes.avatarImage}
                  onError={() => setAvatarErrorUrl(avatarUrl)}
                />
              ) : (
                initials
              )}
            </div>
            <div>
              <h1 className={classes.title}>{t.profile.title}</h1>
              <p className={classes.subtitle}>{t.profile.subtitle}</p>
            </div>
          </div>

          {loading ? (
            <div className={classes.loadingState}>{t.profile.loading}</div>
          ) : (
            <>
              {error ? <div className={classes.errorBox}>{error}</div> : null}
              <div className={classes.content}>
                <div className={classes.infoGrid}>
                  <div className={classes.infoCard}>
                    <div className={classes.iconWrap}>
                      <User size={18} />
                    </div>
                    <div>
                      <div className={classes.infoLabel}>{t.profile.fullName}</div>
                      <div className={classes.infoValue}>{profileData?.name || '-'}</div>
                    </div>
                  </div>

                  <div className={classes.infoCard}>
                    <div className={classes.iconWrap}>
                      <Mail size={18} />
                    </div>
                    <div>
                      <div className={classes.infoLabel}>{t.profile.email}</div>
                      <div className={classes.infoValue}>{profileData?.email || '-'}</div>
                    </div>
                  </div>

                  <div className={classes.infoCard}>
                    <div className={classes.iconWrap}>
                      <Wallet size={18} />
                    </div>
                    <div>
                      <div className={classes.infoLabel}>{t.profile.balance}</div>
                      <div className={classes.infoValue}>{formatBalance(profileData?.balance)}</div>
                    </div>
                  </div>

                  <div className={classes.infoCard}>
                    <div className={classes.iconWrap}>
                      <User size={18} />
                    </div>
                    <div>
                      <div className={classes.infoLabel}>{t.profile.userId}</div>
                      <div className={classes.infoValue}>{userId}</div>
                    </div>
                  </div>

                  <div className={classes.infoCard}>
                    <div className={classes.iconWrap}>
                      <Calendar size={18} />
                    </div>
                    <div>
                      <div className={classes.infoLabel}>{t.profile.memberSince}</div>
                      <div className={classes.infoValue}>{formatDate(createdAt)}</div>
                    </div>
                  </div>

                  <div className={classes.infoCard}>
                    <div className={classes.iconWrap}>
                      <Calendar size={18} />
                    </div>
                    <div>
                      <div className={classes.infoLabel}>{t.profile.lastUpdated}</div>
                      <div className={classes.infoValue}>{formatDate(updatedAt)}</div>
                    </div>
                  </div>

                  <div className={classes.infoCard}>
                    <div className={classes.iconWrap}>
                      <User size={18} />
                    </div>
                    <div>
                      <div className={classes.infoLabel}>{t.profile.age}</div>
                      <div className={classes.infoValue}>{profileData?.age ?? '-'}</div>
                    </div>
                  </div>
                </div>

                <div className={classes.editSection}>
                  <h2 className={classes.editTitle}>{t.profile.editSectionTitle}</h2>
                  <form className={classes.form} onSubmit={handleSaveProfile}>
                    <div className={classes.inputGroup}>
                      <label className={classes.label}>
                        <Camera size={14} style={{ marginRight: 6 }} />
                        {t.profile.avatarUrl}
                      </label>
                      <input
                        type="url"
                        name="profileImageUrl"
                        className={classes.input}
                        value={formData.profileImageUrl}
                        onChange={handleChange}
                        placeholder={t.profile.avatarPlaceholder}
                      />
                    </div>

                    <div className={classes.inputGroup}>
                      <label className={classes.label}>{t.profile.age}</label>
                      <input
                        type="number"
                        min="1"
                        max="120"
                        name="age"
                        className={classes.input}
                        value={formData.age}
                        onChange={handleChange}
                        placeholder={t.profile.agePlaceholder}
                      />
                    </div>

                    <div className={classes.actions} style={{ gridColumn: '1 / -1' }}>
                      <button type="submit" className={classes.saveBtn} disabled={isSaving}>
                        <Save size={16} />
                        {isSaving ? t.profile.savingBtn : t.profile.saveBtn}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
