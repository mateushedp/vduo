import 'package:flutter/material.dart';
import 'package:vduo/widgets/profile_widget.dart';
import 'package:vduo/widgets/user_info_row.dart';
import 'package:vduo/widgets/user_info_row2.dart';

import '../dbHelper/mongodb.dart';
import '../models/User.dart';
import '../widgets/custom_drawer.dart';

class Home extends StatefulWidget {
  static const nomeRota = "/home";

  const Home({Key? key}) : super(key: key);

  @override
  State<Home> createState() => _Home();
}

class _Home extends State<Home> {
  Map? pessoa;

  @override
  Widget build(BuildContext context) {
    final Map dados = ModalRoute.of(context)!.settings.arguments as Map;
    final Map user = dados['user'];

    return Scaffold(
        backgroundColor: const Color(0xFF292967),
        appBar: AppBar(backgroundColor: const Color(0xFF292967)),
        drawer: CustomDrawer(
          user: user,
        ),
        body: SingleChildScrollView(
          physics: const ScrollPhysics(),
          child: Column(
            children: [
              UserInfoRow(user: user),
              const Divider(
                height: 20,
                thickness: 2,
                indent: 20,
                endIndent: 20,
                color: Colors.white,
              ),
              FutureBuilder<List>(
                initialData: List.empty(), //Cria uma lista vazia
                future: _listUsers(user),
                builder: (context, snapshot) {
                  return snapshot.hasData
                      ? ListView.builder(
                          physics: const NeverScrollableScrollPhysics(),
                          scrollDirection: Axis.vertical,
                          shrinkWrap: true,
                          padding: const EdgeInsets.all(10.0),
                          itemCount: snapshot.data!.length,
                          itemBuilder: (context, i) {
                            pessoa = snapshot.data![i];
                            return _buildRow(context, pessoa!);
                          },
                        )
                      : const Center(
                          child: CircularProgressIndicator(),
                        );
                },
              )
            ],
          ),
        ));
  }

  Widget _buildRow(context, user) {
    return ListTile(
      title: UserInfoRow2(user: user),
      onTap: () {
        showDialog(
            context: context,
            builder: (BuildContext context) {
              return ProfileWidget(user: user);
            });
      },
    );
  }

  Future<List<Map>> _listUsers(Map user) async {
    List<Map> list = await MongoDatabase.list();
    list.removeWhere((item) => item['_id'] == user['id']);
    list.sort(((a, b) {
      return a['rank'].compareTo(b['rank']);
    }));
    return list;
  }
}
