import 'dart:async';

import 'package:flutter/material.dart';
import 'package:vduo/dbHelper/mongodb.dart';

class LoginForm extends StatefulWidget {
  static const nomeRota = "/form";

  const LoginForm({Key? key}) : super(key: key);

  @override
  State<LoginForm> createState() => _LoginForm();
}

class _LoginForm extends State<LoginForm> {
  double _height = 300;
  final _formKey = GlobalKey<FormState>();

  String? email, password;
  bool validate = false;
  bool hasError = false;
  final controllerEmail = TextEditingController();
  final controllerPassword = TextEditingController();

  @override
  void dispose() {
    controllerEmail.dispose();
    controllerPassword.dispose();
    super.dispose();
  }

  @override
  void initState() {
    super.initState();
    controllerEmail.addListener(() {
      email = controllerEmail.text;
    });
    controllerPassword.addListener(() {
      password = controllerPassword.text;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Material(
      color: const Color(0xFF292967),
      child: SingleChildScrollView(
        child: Container(
            decoration: const BoxDecoration(color: Color(0xFF292967)),
            height: _height,
            padding: const EdgeInsets.all(15.0),
            child: Form(
              key: _formKey,
              child: _formUI(),
            )),
      ),
    );
  }

  Widget _formUI() {
    return Container(
      margin: const EdgeInsets.only(left: 32, right: 32),
      child: Column(
        children: <Widget>[
          Container(
            margin: const EdgeInsets.only(bottom: 15),
            child: TextFormField(
              controller: controllerEmail,
              style: Theme.of(context).textTheme.bodyText1,
              decoration: const InputDecoration(labelText: 'E-mail'),
            ),
          ),
          TextFormField(
            controller: controllerPassword,
            style: Theme.of(context).textTheme.bodyText1,
            decoration: const InputDecoration(
              labelText: 'Senha',
            ),
            obscureText: true,
          ),
          hasError
              ? Column(
                  children: const [
                    Text(
                      'Email ou senha inválidos.',
                      style: TextStyle(color: Colors.red, fontSize: 16),
                    ),
                    SizedBox(height: 14)
                  ],
                )
              : const SizedBox(height: 30),
          SizedBox(
            height: 46,
            width: 150,
            child: ElevatedButton(
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFF29293b),
                shape: RoundedRectangleBorder(
                    //to set border radius to button
                    borderRadius: BorderRadius.circular(10)),
              ),
              onPressed: _sendForm,
              child: Text(
                'Enviar',
                style: Theme.of(context).textTheme.bodyText1,
              ),
            ),
          ),
          Container(
            margin: const EdgeInsets.only(top: 20),
            child: InkWell(
                onTap: () {
                  Navigator.pushReplacementNamed(context, "/signup",
                      arguments: {
                        "email": email,
                      });
                },
                child: const Text(
                  'Não tenho cadastro',
                  style: TextStyle(color: Color(0xFF9e9cc1)),
                )),
          ),
        ],
      ),
    );
  }

  Future<Map?> _findUser(String? email, String? password) async {
    // final User user = await MongoDatabase.findByEmail(email, password);
    var user = await MongoDatabase.findByEmail(email, password);
    return user;
  }

  _sendForm() async {
    if (_formKey.currentState!.validate()) {
      // Sem erros na validação
      _formKey.currentState!.save();

      var result = await _findUser(email, password);
      if (result != null) {
        hasError = false;
        Navigator.pushReplacementNamed(context, "/profile", arguments: {
          "user": result,
        });
      } else {
        print('\nUsuário nao encontrado.\n');
        setState(() {
          hasError = true;
        });
      }
    } else {
      // // erro de validação
      setState(() {
        validate = true;
      });
    }
  }
}
