import 'package:flutter/material.dart';
import 'package:vduo/dbHelper/mongodb.dart';
import 'views/myapp.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await MongoDatabase.connect();
  runApp(const MyApp());
}
