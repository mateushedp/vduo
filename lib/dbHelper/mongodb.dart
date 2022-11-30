import 'package:mongo_dart/mongo_dart.dart';
import 'package:vduo/dbHelper/constants.dart';
import 'package:vduo/models/User.dart';

class MongoDatabase {
  static var db, userCollection;

  static connect() async {
    db = await Db.create(MONGO_CONN_URL);
    await db.open();
    userCollection = db.collection(USER_COLLECTION);
  }

  static Future<int> insert(User data) async {
    try {
      var result = await userCollection.insertOne(data.toMap());
      print(result.nInserted);
      if (result.isSuccess) {
        print("Usuário criado com sucesso");
      } else {
        print("Erro ao criar usuário");
      }
      return result.nInserted;
    } catch (e) {
      print(e.toString());
      return 0;
    }
  }

  static Future<Map?> findByEmail(String? email, String? password) async {
    var result;
    try {
      result = await userCollection
          .findOne(where.eq('email', email).eq('password', password))!;
      return result;
    } catch (e) {
      print(e.toString());
      return null;
    }
  }

  static Future<Map?> findById(String? id) async {
    var result;
    try {
      result = await userCollection.findOne(where.eq('_id', id))!;
      return result;
    } catch (e) {
      print(e.toString());
      return null;
    }
  }

  static Future<List<Map>> list() async {
    var result = await userCollection.find().toList();
    return result;
  }

  static Future<int> deleteById(Map user) async {
    var result = await userCollection.deleteOne({'_id': user['_id']});
    return result.nRemoved;
  }

  static Future<int> update(User user) async {
    try {
      Map updatedUser = await userCollection.findOne(where.eq('_id', user.id));
      var userMap = user.toMap();

      updatedUser['name'] = userMap['name'];
      updatedUser['email'] = userMap['email'];
      updatedUser['password'] = userMap['password'];
      updatedUser['discord'] = userMap['discord'];
      updatedUser['tag'] = userMap['tag'];
      updatedUser['rank'] = userMap['rank'];
      updatedUser['agent'] = userMap['agent'];

      await userCollection.save(updatedUser);
      return 1;
    } catch (e) {
      print(e.toString());
      return 0;
    }
  }
}
