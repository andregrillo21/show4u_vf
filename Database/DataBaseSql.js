import MSSQL from 'react-native-mssql';

const config = {
    server: 'show4you.database.windows.net',
    username: 'adminuser',
    password: '!@#Sup2k19!@#',
    database: 'S4Y',
}

MSSQL.connect(config);

export default MSSQL;