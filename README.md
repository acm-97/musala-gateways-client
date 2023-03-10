# Gateways Management Client

You can see the [core repo here](https://github.com/acm-97/musala-gateways-core)

## Description of the task

Create a REST service (JSON/HTTP) for storing information about these
gateways and their associated devices. This information must be stored in the database.\
When storing a gateway, any field marked as “to be validated” must be validated and an
error returned if it is invalid. Also, no more that 10 peripheral devices are allowed for a
gateway.\
The service must also offer an operation for displaying information about all stored gateways
(and their devices) and an operation for displaying details for a single gateway. Finally, it
must be possible to add and remove a device from a gateway.

Each gateway has:

- a unique serial number (string),
- human-readable name (string),
- IPv4 address (to be validated),
- multiple associated peripheral devices.

Each peripheral device has:

- a UID (number),
- vendor (string),
- date created,
- status - online/offline.

## How to start?

- First you need to install the dependencies, type `yarn install` or `npm install` on console.
- Then, to get the server running:
  - Create `.env` file and put the content of `.env.template` inside. This template is only to display the environment variables and a example of the values in this case you can use the same if you use it in localhost.
  - Once created you can then type in console `yarn start` or `npm run start` if you want the server runing.
  - To run the tests, type in console `yarn test` or `npm run test`
  - To run the tests with a visual interface, type in console `yarn test:ui` or `npm run test:ui`
