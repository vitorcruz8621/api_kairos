//import "./mainSGC";
function helloWorld() { return 'Hello world!'; }

describe('Ola Mundo', () => { 
    it('testar retorno da funcao ola mundo', () => { 
        expect(helloWorld()).toEqual('Hello world!'); 
    });
});