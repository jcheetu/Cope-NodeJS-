/**
 * Session Configuration
 * (sails.config.session)
 *
 * Use the settings below to configure session integration in your app.
 * (for additional recommended settings, see `config/env/production.js`)
 *
 * For all available options, see:
 * https://sailsjs.com/config/session
 */

// module.exports.session = {

//   /***************************************************************************
//   *                                                                          *
//   * Session secret is automatically generated when your new app is created   *
//   * Replace at your own risk in production-- you will invalidate the cookies *
//   * of your users, forcing them to log in again.                             *
//   *                                                                          *
//   ***************************************************************************/
//   //secret: '6df9ea54a99ed2d7917db90d7fe57f0f',

//   "hooks": {
//     "session": false
//   },
//   sails_hooks__session : false
//   /***************************************************************************
//   *                                                                          *
//   * Customize when built-in session support will be skipped.                 *
//   *                                                                          *
//   * (Useful for performance tuning; particularly to avoid wasting cycles on  *
//   * session management when responding to simple requests for static assets, *
//   * like images or stylesheets.)                                             *
//   *                                                                          *
//   * https://sailsjs.com/config/session                                       *
//   *                                                                          *
//   ***************************************************************************/
//   // isSessionDisabled: function (req){
//   //   return !!req.path.match(req._sails.LOOKS_LIKE_ASSET_RX);
//   // },

// };

module.exports.session = { secret: 'copesamples-keyword' }