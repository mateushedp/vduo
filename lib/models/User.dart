import 'package:mongo_dart/mongo_dart.dart';

class User {
  ObjectId? id;
  String? name;
  String? email;
  String? password;
  String? discord;
  String? tag;
  String? rank;
  String? agent;

  User(
      {required this.id,
      required this.name,
      required this.email,
      required this.password,
      required this.discord,
      required this.tag,
      required this.rank,
      required this.agent});

  User.fromMap(Map map) {
    id = map['id'];
    name = map['name'];
    email = map['email'];
    password = map['password'];
    discord = map['discord'];
    tag = map['tag'];
    rank = map['rank'];
    agent = map['agent'];
  }

  Map<String, dynamic> toMap() {
    Map<String, dynamic> map = {
      '_id': id,
      'name': name,
      'email': email,
      'password': password,
      'discord': discord,
      'tag': tag,
      'rank': rank,
      'agent': agent,
    };

    if (id != null) {
      map['id'] = id;
    }

    return map;
  }

  @override
  String toString() {
    return ('ID: $id |  Nome: $name |  Email: $email');
  }
}
