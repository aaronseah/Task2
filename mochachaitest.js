const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./app'); 
const should = chai.should();

chai.use(chaiHttp);

describe('Quotes', () => {
    // Test GET
    describe('/GET quotes', () => {
        it('GET all quotes', (done) => {
            chai.request(app)
                .get('/quotes')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    // Test POST
    describe('/POST quote', () => {
        it('POST a new quote', (done) => {
            const quote = {
                text: "Quote 3",
                author: "Author 3"
            };
            chai.request(app)
                .post('/quotes')
                .send(quote)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('text').eql(quote.text);
                    res.body.should.have.property('author').eql(quote.author);
                    done();
                });
        });
    });

    // Test PUT
    describe('/PUT/:id quote', () => {
        it('PUT a quote by id', (done) => {
            const quote = {
                text: "Updated Quote 1",
                author: "Updated Author 1"
            };
            const quoteId = 1;
            chai.request(app)
                .put('/quotes/' + quoteId)
                .send(quote)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('text').eql(quote.text);
                    res.body.should.have.property('author').eql(quote.author);
                    done();
                });
        });
    });

    // Test DELETE
    describe('/DELETE/:id quote', () => {
        it('DELETE a quote by id', (done) => {
            const quoteId = 2;
            chai.request(app)
                .delete('/quotes/' + quoteId)
                .end((err, res) => {
                    res.should.have.status(204);
                    done();
                });
        });
    });
});

