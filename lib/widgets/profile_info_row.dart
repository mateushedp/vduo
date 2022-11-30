import 'package:flutter/material.dart';

class ProfileInfoRow extends StatelessWidget {
  final String? text;
  final image;
  const ProfileInfoRow({super.key, required this.image, required this.text});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Container(
          child: image!,
          width: 25,
          height: 25,
          margin: const EdgeInsets.only(left: 20, right: 20, top: 20),
        ),
        Container(
            margin: const EdgeInsets.only(top: 20),
            child: Text(
              text!,
              style: Theme.of(context).textTheme.bodyText1,
            ))
      ],
    );
  }
}
