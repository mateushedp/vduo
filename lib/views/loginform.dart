import 'dart:async';

import 'package:flutter/material.dart';

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
    // Timer(const Duration(seconds: 1), () {
    //   _height = 300;
    // });
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
      color: Colors.white,
      child: SingleChildScrollView(
        child: Container(
            decoration: BoxDecoration(color: Color(0xFF292967)),
            height: _height,
            padding: EdgeInsets.all(15.0),
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
            margin: EdgeInsets.only(bottom: 15),
            child: TextFormField(
              controller: controllerEmail,
              style: Theme.of(context).textTheme.bodyText1,
              decoration: InputDecoration(labelText: 'E-mail'),
              validator: _validarEmail,
            ),
          ),
          TextFormField(
            controller: controllerPassword,
            style: Theme.of(context).textTheme.bodyText1,
            decoration: InputDecoration(
              labelText: 'Senha',
            ),
            // validator: null,
            validator: _validarSenha,
            obscureText: true,
          ),
          SizedBox(height: 30),
          SizedBox(
            height: 46,
            width: 150,
            child: ElevatedButton(
              style: ElevatedButton.styleFrom(
                backgroundColor: Color(0xFF29293b),
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
                  print('tappp');
                },
                child: Text(
                  'Não tenho cadastro',
                  style: TextStyle(color: Colors.blue),
                )),
          ),
        ],
      ),
    );
  }

  String? _validarNome(String? value) {
    String patttern = r'(^[a-zA-Z ]*$)';
    RegExp regExp = RegExp(patttern);
    if (value!.isEmpty) {
      return "Informe o nome";
    } else if (!regExp.hasMatch(value)) {
      return "O nome deve conter caracteres de a-z ou A-Z";
    }
    return null;
  }

  String? _validarSenha(String? value) {
    String pattern = r'^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$';
    RegExp regExp = RegExp(pattern);
    if (value!.isEmpty) {
      return "Insira sua senha";
    } else if (!regExp.hasMatch(value)) {
      return "A senha deve conter 8 caracteres, 1 letra e 1 numero";
    }
  }

  String? _validarEmail(String? value) {
    String pattern =
        r'^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$';
    RegExp regExp = RegExp(pattern);
    if (value!.isEmpty) {
      return "Informe o Email";
    } else if (!regExp.hasMatch(value)) {
      return "Email inválido";
    } else {
      return null;
    }
  }

  _sendForm() {
    if (_formKey.currentState!.validate()) {
      // Sem erros na validação
      _formKey.currentState!.save();
      print("Email $email");

      Navigator.pushReplacementNamed(context, "/signup", arguments: {
        "email": email,
      });
    } else {
      // // erro de validação
      setState(() {
        validate = true;
      });
    }
  }
}
