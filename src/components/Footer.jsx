import React from 'react';
import { Link } from 'react-router-dom';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  footer: {
    backgroundColor: '#111827',
    color: '#F3F4F6',
    padding: '4rem 2rem 2rem',
    marginTop: 'auto',
  },
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '3rem',
    marginBottom: '3rem',
  },
  brandSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  brand: {
    fontSize: '1.5rem',
    fontWeight: '800',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  desc: {
    color: '#9CA3AF',
    lineHeight: '1.6',
    fontSize: '0.95rem',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  columnTitle: {
    fontSize: '1rem',
    fontWeight: '700',
    color: 'white',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  linkGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  link: {
    color: '#9CA3AF',
    textDecoration: 'none',
    fontSize: '0.95rem',
    transition: 'color 0.2s',
    '&:hover': { color: '#60A5FA' },
  },
  bottomBar: {
    borderTop: '1px solid #374151',
    paddingTop: '2rem',
    textAlign: 'center',
    color: '#6B7280',
    fontSize: '0.875rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  socials: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1rem',
  },
  socialIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#374151',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: '#4F46E5',
      transform: 'translateY(-3px)',
      color: 'white',
    },
    '& svg': {
      width: '20px',
      height: '20px',
      fill: 'currentColor',
    },
  },
});

const Footer = () => {
  const classes = useStyles();
  const year = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'Twitter',
      href: 'https://x.com/5044Ravano',
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/ravano.widodo.54',
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.148 0-2.797 1.603-2.797 2.87v1.101h4.188l-.582 3.667h-3.606v7.98H9.101z" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/ravanoakbarwidodo/',
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/ravano-akbar-widodo/',
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.brandSection}>
          <div className={classes.brand}>
            <span>🛒</span> Ravano Shop
          </div>
          <p className={classes.desc}>
            Platform manajemen toko terbaik untuk bisnis modern. Kelola produk,
            stok, dan penjualan dengan mudah dalam satu aplikasi.
          </p>
          <div className={classes.socials}>
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={classes.socialIcon}
                title={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div className={classes.column}>
          <h4 className={classes.columnTitle}>Navigasi</h4>
          <div className={classes.linkGroup}>
            <Link to="/" className={classes.link}>
              Home
            </Link>
            <Link to="/list-products" className={classes.link}>
              Katalog
            </Link>
            <Link to="/add-products" className={classes.link}>
              Tambah Produk
            </Link>
          </div>
        </div>

        <div className={classes.column}>
          <h4 className={classes.columnTitle}>Dukungan</h4>
          <div className={classes.linkGroup}>
            <a href="#" className={classes.link}>
              Pusat Bantuan
            </a>
            <a href="#" className={classes.link}>
              Syarat & Ketentuan
            </a>
            <a href="#" className={classes.link}>
              Kebijakan Privasi
            </a>
            <a href="#" className={classes.link}>
              Kontak Kami
            </a>
          </div>
        </div>
      </div>

      <div className={classes.bottomBar}>
        <span>&copy; {year} Ravano Shop. All rights reserved.</span>
        <span>Made with ❤️ in Indonesia</span>
      </div>
    </footer>
  );
};

export default Footer;
