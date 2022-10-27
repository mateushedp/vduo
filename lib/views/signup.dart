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
    // final Map pessoa = ModalRoute.of(context)!.settings.arguments as Map;
    // print(pessoa);

    return Container(
      padding: EdgeInsets.all(30),
      decoration: BoxDecoration(color: Color(0xFF292967)),
      child: Column(children: [
        Row(
          children: [
            Container(
              alignment: Alignment.centerLeft,
              width: 150,
              child: Image.asset('images/valorant-icon.png'),
            ),
          ],
        ),
        Container(
            // alignment: Alignment.centerLeft,
            margin: EdgeInsets.only(top: 15),
            child: Text(
              'Bora criar seu perfil?',
              style: Theme.of(context).textTheme.headline1,
              textAlign: TextAlign.left,
            )),
        Container(
            margin: EdgeInsets.only(top: 20),
            child: Text(
                'Insira seus dados, suas preferências no jogo, o que você busca no seu duo, e vamos encontrar alguém para jogar com você!',
                style: Theme.of(context).textTheme.bodyText1,
                textAlign: TextAlign.center)),
        Container(
          margin: EdgeInsets.only(top: 200),
          // alignment: Alignment.bottomCenter,
          child: SizedBox(
            height: 46,
            width: 150,
            child: ElevatedButton(
              style: ElevatedButton.styleFrom(
                backgroundColor: Color(0xFF29293b),
                shape: RoundedRectangleBorder(
                    //to set border radius to button
                    borderRadius: BorderRadius.circular(10)),
              ),
              onPressed: (() => {}),
              child: Text(
                'Continuar',
                style: Theme.of(context).textTheme.bodyText1,
              ),
            ),
          ),
        )
      ]),
    );
  }
}
