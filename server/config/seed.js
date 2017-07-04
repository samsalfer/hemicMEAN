/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';
import Structure from '../api/structure/structure.model';
import Element from '../api/element/element.model';
import Q from 'q';
import config from './environment/';

export default function seedDatabaseIfNeeded() {
  if(config.seedDB) {
    // Thing.find({}).remove()
    //   .then(() => {
    //     let thing = Thing.create({
    //       name: 'Development Tools',
    //       info: 'Integration with popular tools such as Webpack, Gulp, Babel, TypeScript, Karma, '
    //             + 'Mocha, ESLint, Node Inspector, Livereload, Protractor, Pug, '
    //             + 'Stylus, Sass, and Less.'
    //     }, {
    //       name: 'Server and Client integration',
    //       info: 'Built with a powerful and fun stack: MongoDB, Express, '
    //             + 'AngularJS, and Node.'
    //     }, {
    //       name: 'Smart Build System',
    //       info: 'Build system ignores `spec` files, allowing you to keep '
    //             + 'tests alongside code. Automatic injection of scripts and '
    //             + 'styles into your index.html'
    //     }, {
    //       name: 'Modular Structure',
    //       info: 'Best practice client and server structures allow for more '
    //             + 'code reusability and maximum scalability'
    //     }, {
    //       name: 'Optimized Build',
    //       info: 'Build process packs up your templates as a single JavaScript '
    //             + 'payload, minifies your scripts/css/images, and rewrites asset '
    //             + 'names for caching.'
    //     }, {
    //       name: 'Deployment Ready',
    //       info: 'Easily deploy your app to Heroku or Openshift with the heroku '
    //             + 'and openshift subgenerators'
    //     });
    //     return thing;
    //   })
    //   .then(() => console.log('finished populating things'))
    //   .catch(err => console.log('error populating things', err));
    let users = [
      {
        provider: 'local',
        name: 'Test User',
        email: 'test@example.com',
        password: 'test'
      }, {
        provider: 'local',
        role: 'admin',
        name: 'Admin',
        email: 'admin@example.com',
        password: 'admin'
      }];
    let structures = [
      {
        idStructure: 'Medicamentos',
        version: '0',
        name: 'Escala APGAR',
        codeTerm: 'xxxx',
        idPath: 'at0001',
        lifeCycle: 'lifeCycle1',
        language: 'Spanish'
      },
      {
        idStructure: 'Medicamentos',
        version: '1',
        name: 'Escala APGAR',
        codeTerm: 'xxxx',
        idPath: 'at0001',
        lifeCycle: 'lifeCycle1',
        language: 'Spanish'
      },
      {
        idStructure: 'Vacuna',
        version: '0',
        name: 'Escala RAU',
        codeTerm: 'xxxx',
        idPath: 'at0001',
        lifeCycle: 'lifeCycle2',
        language: 'Spanish'
      },
      {
        idStructure: 'Enfermedad',
        version: '0',
        name: 'Escala PERF',
        codeTerm: 'xxxx',
        idPath: 'at0001',
        lifeCycle: 'lifeCycle3',
        language: 'Spanish'
      }];
    let elements = [
      {
        structures: [],
        name: 'Principio activo',
        codeTerm: 'cccc',
        typeData: 'CS',
        terms: [
          {
            name: 'Termino 1',
            codigo: 'trm0001'
          },
          {
            name: 'Termino 2',
            codigo: 'trm0002'
          }
        ]
      },
      {
        structures: [],
        name: 'Dosis',
        codeTerm: 'cccc',
        typeData: 'INT',
        terms: [1, 2, 3, 4, 5, 6]
      }
    ];

    User.find({}).remove()
      .then(() => {
        return Structure.find({}).remove()
        .then(() => console.log('remove structures'))
        .catch(err => console.log('error remove structures: ', err));
      })
      .then(() => {
        return Element.find({}).remove()
        .then(() => console.log('remove elements'))
        .catch(err => console.log('error remove elements: ', err));
      })
      .then(() => {
        return User.create(users)
        .then(() => console.log('finished populating users'))
        .catch(err => console.log('error populating users', err));
      })
      .then(() => {
        return Structure.create(structures)
        .then(() => console.log('finished populating structures'))
        .catch(err => console.log('error populating structures', err));
      })
      .then(() => {
        return Structure.findOne({idStructure: 'Medicamentos'}).exec()
          .then(structure => {
            elements.forEach(element => {
              element.structures.push(structure._id);
            });
            return Element.create(elements)
              .then(elements2 => {
                let idsElements = [];
                elements2.forEach(element2 => {
                  idsElements.push(element2._id);
                });
                return idsElements;
              })
              .then(elements3 => {
                return Structure.findByIdAndUpdate(structure._id, {elements: elements3}).exec()
                  .then(() => console.log('finished populating structures with elements'))
                  .catch(err => console.log('error populating structures with elements', err));
              })
              .then(() => console.log('finished populating elements'))
              .catch(err => console.log('error populating elements', err));
          });
      });

  }
}
