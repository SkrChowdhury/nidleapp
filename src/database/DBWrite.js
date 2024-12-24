import React, {Component} from 'react';

// import Realm from 'realm';

// class DBWrite extends Component {
//     constructor(props) {
//         super(props);

//         realm = new Realm({
//             path: 'nidleDB.realm',
//             schema: [
//                 {
//                     name: 'user',
//                     primaryKey: 'id',
//                     properties: {
//                         id: 'int',
//                         name: 'string?',
//                         email: 'string?',
//                         token: 'string?',
//                     },
//                 },

//                 {
//                     name: 'orgTree',
//                     primaryKey: 'id',
//                     properties: {
//                         id: 'int',
//                         data: 'string',
//                     },
//                 },

//             ],

//         });
//     }

//     realmWrite(table, object) {
//         realm.write(() => {
//             realm.create(table, object, 'modified');
//         });
//     }

// }

// export default new DBWrite();
