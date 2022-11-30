import 'package:flutter/material.dart';
import 'package:vduo/dbHelper/mongodb.dart';
import 'package:vduo/models/User.dart';
import 'package:mongo_dart/mongo_dart.dart' as M;
import 'package:vduo/util/validator.dart';

import '../models/Agents.dart';
import '../models/Ranks.dart';

List<String> populateAgents() {
  List<String> agents = <String>[];
  for (var value in Agents.values) {
    agents.add(value.name.toString());
  }
  return agents;
}

List<String> populateRanks() {
  List<String> ranks = <String>[];
  for (var value in Ranks.values) {
    ranks.add(value.name.toString());
  }
  return ranks;
}

List<String> agents = populateAgents();
List<String> ranks = populateRanks();

class Signup extends StatefulWidget {
  static const nomeRota = "/signup";
  final bool isEdit;
  final Map? user;

  const Signup({this.isEdit = false, this.user, Key? key}) : super(key: key);

  @override
  State<Signup> createState() => _Signup();
}

class _Signup extends State<Signup> {
  final _formKey = GlobalKey<FormState>();
  final _formKey2 = GlobalKey<FormState>();
  int _index = 0;

  String? name, email, password, discord, tag;

  String? agent = agents.first;
  String? rank = ranks.first;

  bool validate = false;

  final controllerName = TextEditingController();
  final controllerEmail = TextEditingController();
  final controllerPassword = TextEditingController();
  final controllerDiscord = TextEditingController();
  final controllerTag = TextEditingController();

  @override
  void dispose() {
    controllerName.dispose();
    controllerEmail.dispose();
    controllerPassword.dispose();
    controllerDiscord.dispose();
    controllerTag.dispose();
    super.dispose();
  }

  @override
  void initState() {
    super.initState();
    controllerName.addListener(() {
      name = controllerName.text;
    });
    controllerEmail.addListener(() {
      email = controllerEmail.text;
    });
    controllerPassword.addListener(() {
      password = controllerPassword.text;
    });
    controllerDiscord.addListener(() {
      discord = controllerDiscord.text;
    });
    controllerTag.addListener(() {
      tag = controllerTag.text;
    });
    if (widget.isEdit) {
      controllerName.text = widget.user!['name'];
      controllerEmail.text = widget.user!['email'];
      controllerPassword.text = widget.user!['password'];
      controllerDiscord.text = widget.user!['discord'];
      controllerTag.text = widget.user!['tag'];
      agent = widget.user!['agent'];
      rank = widget.user!['rank'];
    }
  }

  @override
  Widget build(BuildContext context) {
    return Material(
      child: Container(
        padding: const EdgeInsets.only(right: 20),
        color: const Color(0xFF292967),
        child: Stepper(
          controlsBuilder: (BuildContext context, ControlsDetails details) {
            return Container(
              margin: const EdgeInsets.only(top: 15),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: <Widget>[
                  SizedBox(
                    width: 100,
                    height: 50,
                    child: TextButton(
                      style: TextButton.styleFrom(
                        backgroundColor: const Color(0xFF29293b),
                      ),
                      onPressed: details.onStepCancel,
                      child: const Text('VOLTAR',
                          style: TextStyle(color: Colors.white)),
                    ),
                  ),
                  SizedBox(
                    width: 100,
                    height: 50,
                    child: TextButton(
                      style: TextButton.styleFrom(
                        backgroundColor: const Color(0xFF29293b),
                      ),
                      onPressed: details.onStepContinue,
                      child: const Text('PRÓXIMO',
                          style: TextStyle(color: Colors.white)),
                    ),
                  ),
                ],
              ),
            );
          },
          currentStep: _index,
          onStepCancel: () {
            if (_index > 0) {
              setState(() {
                _index -= 1;
              });
            }
          },
          onStepContinue: () async {
            if (_index == 1) {
              if (_formKey2.currentState!.validate()) {
                _formKey2.currentState!.save();
                final user = User(
                    id: widget.isEdit ? widget.user!['_id'] : M.ObjectId(),
                    name: name,
                    email: email,
                    password: password,
                    discord: discord,
                    tag: tag,
                    rank: rank,
                    agent: agent);
                if (widget.isEdit) {
                  int result = await _updateData(user);
                  if (result == 1) {
                    print('foi atualizado');
                    Navigator.pushReplacementNamed(context, "/profile",
                        arguments: {
                          "user": user.toMap(),
                        });
                  } else {}
                } else {
                  Map? newUser = await _insertData(user);
                  if (newUser != null) {
                    print('foi inserido.');
                    print(newUser);
                    Navigator.pushReplacementNamed(context, "/profile",
                        arguments: {
                          "user": newUser,
                        });
                  } else {
                    print('nao foi inserido');
                  }
                }
              } else {
                setState(() {
                  validate = true;
                });
              }
            }
            if (_index <= 0) {
              if (_formKey.currentState!.validate()) {
                _formKey.currentState!.save();
                setState(() {
                  _index += 1;
                });
              } else {
                setState(() {
                  validate = true;
                });
              }
            }
          },
          onStepTapped: (int index) {
            setState(() {
              _index = index;
            });
          },
          steps: <Step>[
            Step(
              title: const Text(
                'Dados pessoais',
                style: TextStyle(fontSize: 24),
              ),
              content: Form(
                key: _formKey,
                child: _formUI(),
              ),
            ),
            Step(
              title: const Text(
                'Dados do jogo',
                style: TextStyle(fontSize: 24),
              ),
              content: Column(children: [
                Container(
                  margin: const EdgeInsets.only(top: 10, bottom: 10),
                  child: Form(
                    key: _formKey2,
                    child: TextFormField(
                      controller: controllerTag,
                      style: Theme.of(context).textTheme.bodyText1,
                      decoration: const InputDecoration(
                        labelText: 'Tag',
                      ),
                      validator: Validator.validarTag(),
                    ),
                  ),
                ),
                _dropdownWithIcon(ranks, isRank: true),
                const SizedBox(height: 10),
                _dropdownWithIcon(agents)
              ]),
            ),
          ],
        ),
      ),
    );
  }

  Widget _formUI() {
    return Container(
      child: Column(
        children: <Widget>[
          //formfield nome
          Container(
            margin: const EdgeInsets.only(top: 10, bottom: 10),
            child: TextFormField(
              controller: controllerName,
              style: Theme.of(context).textTheme.bodyText1,
              decoration: const InputDecoration(
                labelText: 'Nome',
              ),
              validator: Validator.validarNome(),
            ),
          ),

          //formfield email
          Container(
            margin: const EdgeInsets.only(bottom: 10),
            child: TextFormField(
              controller: controllerEmail,
              style: Theme.of(context).textTheme.bodyText1,
              decoration: const InputDecoration(labelText: 'E-mail'),
              validator: Validator.validarEmail(),
            ),
          ),

          //formfield senha
          Container(
            margin: const EdgeInsets.only(bottom: 10),
            child: TextFormField(
              controller: controllerPassword,
              style: Theme.of(context).textTheme.bodyText1,
              decoration: const InputDecoration(
                labelText: 'Senha',
              ),
              validator: Validator.validarSenha(),
              obscureText: true,
            ),
          ),

          //formfield discord
          Container(
            margin: const EdgeInsets.only(bottom: 10),
            child: TextFormField(
              controller: controllerDiscord,
              style: Theme.of(context).textTheme.bodyText1,
              decoration: const InputDecoration(
                labelText: 'Discord',
              ),
              validator: Validator.validarDiscord(),
            ),
          ),
        ],
      ),
    );
  }

  Widget _dropdownWithIcon(List<String> arrayValues, {bool isRank = false}) {
    return Material(
      child: (Container(
        color: const Color(0xFF292967),
        child: Theme(
          data: Theme.of(context).copyWith(
            canvasColor: const Color(0xFF636394),
          ),
          child: DropdownButtonFormField(
            value: isRank ? rank : agent,
            icon: const Icon(
              Icons.keyboard_arrow_down,
              color: Colors.white,
              size: 30,
            ),
            elevation: 16,
            style: Theme.of(context).textTheme.bodyText1,
            onChanged: (String? value) {
              isRank ? _setRank(value) : _setAgent(value);
            },
            items: arrayValues.map<DropdownMenuItem<String>>((String value) {
              return DropdownMenuItem<String>(
                value: value,
                child: Row(children: [
                  Image.asset(
                    'images/icons/${value}_icon.png',
                    width: 40,
                  ),
                  Container(
                    margin: const EdgeInsets.only(left: 20),
                    child: Text(value),
                  )
                ]),
              );
            }).toList(),
          ),
        ),
      )),
    );
  }

  _setAgent(String? value) {
    setState(() {
      agent = value;
    });
  }

  _setRank(String? value) {
    setState(() {
      rank = value;
    });
  }

  Future<int> _updateData(User user) async {
    int result = await MongoDatabase.update(user);
    return result;
  }

  Future<Map?> _insertData(User user) async {
    var result = await MongoDatabase.insert(user);
    if (result == 1) {
      Map? userMap = user.toMap();
      return userMap;
    }
    return null;
  }
}
