#previo a todo hay que crear el entorno virtual y luego activarlo


from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_marshmallow import Marshmallow

#cear la app
app = Flask(__name__)

#usar Cors para dar acceso a las rutas desde el fronend
CORS(app)

#configuracion de la base de datos desde app, se le informa a la app donde ubicar la base de datos
                                                      #//username:password@url/nombre de la base de datos                          
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://root:Minimarket2@localhost/huespedes"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

#comunicar la app con sqlAlchemy
db = SQLAlchemy(app)

#creamos el objeto map que permite la transformacion de datos json
ma = Marshmallow(app)

#estructura de la tabla a crear a partir de una clase
class Huesped(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100))
    clave = db.Column(db.String(100))
    email = db.Column(db.String(100))
    edad = db.Column(db.Integer)
    imagen = db.Column(db.String(400))

    def __init__(self, nombre, clave, email, edad, imagen):
        self.nombre = nombre
        self.clave = clave
        self.email = email
        self.edad = edad
        self.imagen = imagen


#codigo para crear las tablas dentro de una clase
with app.app_context():
    db.create_all()

#crear clase para recibr y transformar los datos a json. Se definen los campos de la tabla
class HuespedSchema(ma.Schema):
    class Meta:
        fields=('id', 'nombre', 'clave', 'email', 'edad', 'imagen')


#difereniar cuando se transforma un dato o lista de datos a json para ver un registro por ejemplo
huesped_schema = HuespedSchema()
huespedes_schema = HuespedSchema(many=True)

#crear las rutas
@app.route("/huespedes", methods=['GET'])
def get_huespedes():
    all_huesped = Huesped.query.all()  #almacena un listado de objetos
    return huespedes_schema.jsonify(all_huesped)  #retorna ya transformado lo que se consulto y almaceno en all_productos


@app.route("/huespedes", methods=['POST'])
def create_huesped():
    """
    {
        "nombre" : "Carlos",
        "clave" : 12345,
        "email"  : "correo@correo.com",
        "edad"  : 35
        "imagen" : "https://picsum.photos/200/300?grayscale"
    }
    """
    nombre = request.json['nombre']
    clave = request.json['clave']
    email = request.json['email']
    edad = request.json['edad']
    imagen = request.json['imagen']

    new_huesped = Huesped(nombre, clave, email, edad, imagen)
    db.session.add(new_huesped)
    db.session.commit()
    return huesped_schema.jsonify(new_huesped)

@app.route("/huespedes/<id>", methods=['GET'])
def get_huesped(id):
    huesped = Huesped.query.get(id)
    return huesped_schema.jsonify(huesped)

@app.route("/huespedes/<id>", methods=['DELETE'])
def delete_huesped(id):
    huesped=Huesped.query.get(id)
    db.session.delete(huesped)
    db.session.commit()
    return huesped_schema.jsonify(huesped)


@app.route("/huespedes/<id>", methods=['PUT'])
def update_huesped(id):
    huesped=Huesped.query.get(id)
    #recibe los datos consultddos que vamos a modificar
    nombre = request.json['nombre']
    clave = request.json['clave']
    email = request.json['email']
    edad = request.json['edad']
    imagen = request.json['imagen']

    #realizo la modificacion a los datos consultaods
    huesped.nombre=nombre
    huesped.clave=clave
    huesped.email=email
    huesped.edad=edad
    huesped.imagen=imagen

    #Guardo los cambio (eneste caso no inserto "add" porque no agregamos un objeto nuevo sino que modificamos un ya existente)
    db.session.commit()
    
    #convierto los datos a json
    return huesped_schema.jsonify(huesped)


#definis el bloque principal
if __name__ == '__main__':
    app.run(debug=True)
