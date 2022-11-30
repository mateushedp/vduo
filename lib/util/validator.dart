import 'package:flutter/material.dart';

class Validator {
  static FormFieldValidator validarEmail() {
    return (value) {
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
    };
  }

  static FormFieldValidator validarNome() {
    return (value) {
      String patttern = r'(^[a-zA-Z ]*$)';
      RegExp regExp = RegExp(patttern);
      if (value!.isEmpty) {
        return "Informe o nome";
      } else if (!regExp.hasMatch(value)) {
        return "O nome deve conter caracteres de a-z ou A-Z";
      }
      return null;
    };
  }

  static FormFieldValidator validarSenha() {
    return (value) {
      String pattern = r'^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$';
      RegExp regExp = RegExp(pattern);
      if (value!.isEmpty) {
        return "Insira sua senha";
      } else if (!regExp.hasMatch(value)) {
        return "A senha deve conter 8 caracteres, 1 letra e 1 numero";
      }
    };
  }

  static FormFieldValidator validarDiscord() {
    return (value) {
      String pattern = r'^.{3,32}#[0-9]{4}$';
      RegExp regExp = RegExp(pattern);
      if (value!.isEmpty) {
        return "Insira seu discord";
      } else if (!regExp.hasMatch(value)) {
        return "Discord inválido";
      }
    };
  }

  static FormFieldValidator validarTag() {
    return (value) {
      String pattern = r'^.{3,32}#.{3,32}$';
      RegExp regExp = RegExp(pattern);
      if (value!.isEmpty) {
        return "Insira sua tag no Valorant";
      } else if (!regExp.hasMatch(value)) {
        return "Tag inválida";
      }
    };
  }
}
