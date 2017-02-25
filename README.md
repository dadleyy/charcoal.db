![charcoal logo](https://cloud.githubusercontent.com/assets/1545348/23335776/8f55a0fc-fb8a-11e6-8a36-9061bbe03973.png)

This project contains [nodejs](http://knexjs.org/) mysql migrations for the [charcoal](https://github.com/dadleyy/charcoal.api) api, with help from the [knex](http://knexjs.org/) library.

### Setup

In order to run these migrations, you will need to install the node dependencies and create a `.env` file containing your database connection configuration. An [example](https://github.com/dadleyy/charcoal.db/blob/master/.env.example) has been included in the root of this repository.

Once you node modules and `.env` file have been installed and setup, you can migrate your database using the following commands:

| Command | Result |
| ---- | ---- |
| `npm run up` | Runs any outstanding migrations. |
| `npm run down` | Rolls back the most recent "batch" of migrations. |
| `npm run reset` | Shorthand for running both `npm run down` and `npm run up`. |
| `npm run client:update-credentials` | Re-generates a `client_id` and `client_secret` based on a provided `--client` argument. Supports optional `--redirect-uri` argument to assist getting client configured for local development.  |

### Note for local [charcoal.ui](https://github.com/dadleyy/charcoal.ui) development

When working on the [charcoal.ui](https://github.com/dadleyy/charcoal.ui) codebase locally, you should create a `etc/hosts` entry like `local.ui.charcoal.com`, which should be used as the `redirect_uri` for your main client:

```
$ npm run client:update-credentials -- --client=1 --redirect-uri=http://local.ui.charcoal.com:8888/auth/callbacks/google
```

The generated `client_id` and `client_secret` are required in your ui's `.env` file - see the [ui readme](https://github.com/dadleyy/charcoal.ui/blob/master/README.md) for more information.
