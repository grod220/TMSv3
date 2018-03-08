# The Meatball Stoppe: v3 React App

The app repo for themeatballstoppe.com. If you're in the Orlando area, give us a visit! [YELP](https://www.yelp.com/biz/the-meatball-stoppe-orlando-2) - [Google Maps](https://goo.gl/maps/zQhgK1nnauw)

## Technologies used

- Front-end
	- React v16 (creat-react-app)
	- Styled-components w/ media reference for breakpoints
	- Flexbox
	- Lazy Loading homepage with react-lazyload
	- Custom FB social widget
- Back-end
	- Nodejs / Expressjs
	- Firebase
	- Facebook webhooks
	- Specific Heroku deployment features


#### How to dev locally
For front-end: cd into react-app/ and 'npm install && start'
For back-end: npm start from root. May need to run 'npm install && npm run heroku-postbuild && npm start'

### Notes

- Referenced for static serving: https://github.com/mars/heroku-cra-node.
- Enforced SSL using _express-sslify_, but needed to add localhost exception manually to be able to work locally.

### Update from v2.2
- Migrated from Angular 4 to React
- New Menu design (pinterest-like)
- Guy Fieri feature on Media page
- Central location for menu data
- Better responsive layouts