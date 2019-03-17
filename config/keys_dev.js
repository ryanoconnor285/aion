module.exports = {
  mongoURI: 'mongodb://ryan:abc123@ds127825.mlab.com:27825/kronos',
  seedURI: 'mongoimport -h ds127825.mlab.com:27825 -d kronos -c shifts -u ryan -p abc123 --file ./seed/seed.json',
  secretOrKey: 'secret'
};