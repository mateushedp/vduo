import 'package:flutter/material.dart';

class Signup extends StatefulWidget {
  static const nomeRota = "/signup";

  const Signup({Key? key}) : super(key: key);

  @override
  State<Signup> createState() => _Signup();
}

class _Signup extends State<Signup> {
  @override
  Widget build(BuildContext context) {
    final Map pessoa = ModalRoute.of(context)!.settings.arguments as Map;
    print(pessoa);

    return Center(
        child: Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(
          'Bora criar seu perfil?',
          style: const TextStyle(
              color: Colors.black,
              fontSize: 31,
              decoration: TextDecoration.none),
        ),
        Text('vamo la carea vamoa faze bagulhooooo',
            style: Theme.of(context).textTheme.bodyText1)
      ],
    ));
  }
}
