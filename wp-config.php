<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, and ABSPATH. You can find more information by visiting
 * {@link http://codex.wordpress.org/Editing_wp-config.php Editing wp-config.php}
 * Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'wp_sandbox1');
//define('DB_NAME', 'ieribd_beta_wp');

/** MySQL database username */
define('DB_USER', 'root1');
//define('DB_USER', 'ieribd_root1');

/** MySQL database password */
define('DB_PASSWORD', 'root1');



/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '9k7T-VRp ++/=ApN8H.:l3eV-3:!m0D>f++Np6~hGJcBDw^|Y*H[nx5~]eJTdmyK');
define('SECURE_AUTH_KEY',  ')@,LJVuq0&?TVfKT}4#ga+SC7w]fP**HAEX,8/k|/%mn$+XDTVXHp[]+6ZVlR/SK');
define('LOGGED_IN_KEY',    'pzAj9*F%j=4=0n8vc16&0[/r-g|Z^JH<V2.K|u`lr0bqz_&uGM:92fr*0bI#&[)j');
define('NONCE_KEY',        '8C/d*!NCX.G-<x(<_s`+]&4?C:Q-IuO?-<(6mLGCRg:+IU9 392S%t~[W |/>u$b');
define('AUTH_SALT',        'KQ&Oc>9p|.S[otEqx<:NXgtBd(agFjg7zK%w^dcNuwmQPrJX2fix>R$C]W+@JbFD');
define('SECURE_AUTH_SALT', 'dIB-7XS)W]wNm9D,!gIanI(K<-Pk-[/,kM8IN|~ppGty`JRqUT:U-F:.p%m1Me#K');
define('LOGGED_IN_SALT',   'a,SD<pM$EPUcF.2anK(U5p4R!Ecaap~y`N@ljt<7:@3([`K-F>3Fn+QcDJ`|=[X ');
define('NONCE_SALT',       ']$EX4)32E7,(=Q{[Z+Hv9(~ni_I}TJ;gr|Ep5VLL|!^_a4+0Pux.-Dj.QR+.JVrT');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
