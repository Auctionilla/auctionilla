import { env, argument } from 'chen/core';

export default {

  app: {
    env: env('APP_ENV', 'production'),
    key: env('APP_KEY', 'key'),
    debug: env('APP_DEBUG', true),
    protocol: env('APP_PROTOCOL', 'http'),
    host: env('APP_HOST', 'localhost'),
    port: argument('port', 3000),
    timezone: 'Asia/Manila',
    locale: 'en',
    locals: {
      name: 'My App'
    }
  },

  auth: {
    default: 'site',
    providers: {
      site: {
        model: 'User'
      }
    }
  },

  logger: {
    includeAssets: true,
    format: 'short'
  },

  socketio: {
    options: {
      serveClient: true,
      path: '/socket.io'
    }
  },

  router: {
    caseSensitiveRouting: false,
    strictRouting: false
  },

  database: {
    default: 'default',
    connections: {

      default: {
        client: 'mysql',
        connection: {
          host: env('DB_HOST', 'localhost'),
          user: env('DB_USERNAME', 'root'),
          password: env('DB_PASSWORD', ''),
          database: env('DB_DATABASE', 'database'),
          charset: 'utf8'
        },
        debug: env('DB_DEBUG', false)
      }
    }
  },

  request: {
    encoding: 'utf-8',
    postMaxSize: '2MB',
    uploadMaxSize: '5MB'
  },

  session: {
    resave: false,
    saveUninitialized: false,
    cookie: {
      path: '/',
      httpOnly: true,
      secure: false,
      maxAge: null
    },
    store: {
      driver: 'redis',
      connection: {
        host: env('REDIS_SESSION_HOST', 'localhost'),
        port: env('REDIS_SESSION_PORT', 6379),
        prefix: env('REDIS_SESSION_PREFIX', 'app-sess-local:')
      }
    }
  },

  assets: [
    { prefix: '/assets', path: 'public' },
    { prefix: '/uploads', path: 'uploads' }
  ],

  view: {
    autoescape: true,
    throwOnUndefined: false,
    trimBlocks: false,
    lstripBlocks: false,
    noCache: false
  },

  extensions: {}
};
