<?php


/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * Localized language
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'u411794931_W5b6K' );

/** Database username */
define( 'DB_USER', 'u411794931_3Eelp' );

/** Database password */
define( 'DB_PASSWORD', 'yE1aTQFbfU' );

/** Database hostname */
define( 'DB_HOST', '127.0.0.1' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',          'XSvTa)62IH5}0zQ~$DIyfZs7y([QmflCMd^mDf4i|I4MT)MldV.KxAFsgpY|MdPl' );
define( 'SECURE_AUTH_KEY',   'N#o>[m&$06?/Pc![I2v(gt#p|m>;GTR- kDh!uIx`Hv_a$F2|hJFFkQ<$9`WX1Z{' );
define( 'LOGGED_IN_KEY',     ')>Onq?;*)YQK0(%?pShfT-!:+JEdghUEoWWW][+@M+%rUJ?A,ZDD5nq^=.<RY^qZ' );
define( 'NONCE_KEY',         '.BFhqZjzq!;391FC>Z&oAd#Qa9Hj9fbJ.QnZD+PTGSw^*)NzS!<W)C1AFTV4;jtx' );
define( 'AUTH_SALT',         '.n:hUdtx%YBC67$(!eo}of5{*ih$A<dm`uxCdp.%p$FddS#x3/J0:4i@NN/U5X&u' );
define( 'SECURE_AUTH_SALT',  ')4$fodW<l}Z&3}mF)Hh^%P]NuA!aIcfT+}n#$u$FwF<azS6il`!X2<)$)j*;zaT~' );
define( 'LOGGED_IN_SALT',    'n7ho_eAEwBr!OI8@pXpuzWHAMZ>kuZn0A,&ueq5L6OX|e^5#O5`Wy8uybXRwh3+R' );
define( 'NONCE_SALT',        ' SzQD13cN`m.IU)|F8ZDa=mQ@0b@{kOTEbi{je.Z:=SVbw;u@=wT<Ofs*hNyv18M' );
define( 'WP_CACHE_KEY_SALT', 'k7pWJ?yhju~m2xVp((* x!ZEx5rj>9[sI]h]d$^Nzg3=lttp}pQ7D/_U5f(~}[S4' );


/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';


/* Add any custom values between this line and the "stop editing" line. */



/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
if ( ! defined( 'WP_DEBUG' ) ) {
	define( 'WP_DEBUG', false );
}

define( 'FS_METHOD', 'direct' );
define( 'COOKIEHASH', '6474d60d00b998e75412db974061feed' );
define( 'WP_AUTO_UPDATE_CORE', 'minor' );
define('WPFC_CLEAR_CACHE_AFTER_THEME_UPDATE', true);
define('WP_MEMORY_LIMIT', '768M');
define('WP_MAX_MEMORY_LIMIT', '768M');

define('WPFC_CLEAR_CACHE_AFTER_PLUGIN_UPDATE', true);
/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
