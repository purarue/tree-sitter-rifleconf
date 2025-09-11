module.exports = grammar({
  name: "rifleconf",

  extras: ($) => [$._spaces],

  rules: {
    source_file: ($) => repeat(choice($.rule, $._end_of_line)),

    comment: (_) => /#[^\n]*/,
    _spaces: (_) => /[ \t]+/,

    _linebreak: (_) => /\r?\n/,

    // a comment, or the end of the line
    _end_of_line: ($) =>
      choice(
        seq(optional($._spaces), $.comment, $._linebreak),
        seq(optional($._spaces), $._linebreak),
      ),

    unary_condition_identifier: (_) =>
      choice("X", "file", "directory", "terminal", "else"),

    binary_condition_identifier: (_) =>
      choice(
        "match", // regex
        "ext", // regex
        "mime", // regex
        "name", // regex
        "path", // regex
        "has", // regex (shell command or environment variable)
        "env", // regex (environment variable)
        "number", // integer
        "flag", // [A-Za-z]
        "label", // regex
      ),

    // https://github.com/tree-sitter/tree-sitter-javascript/blob/391a8fcc48a11f63bf18ec9885f6f069e760949a/grammar.js#L1022
    identifier: (_) =>
      prec(
        -1,
        repeat1(
          choice(
            seq(
              "[",
              repeat(
                choice(
                  seq("\\", /./), // escaped character
                  /[^\]\n\\]/, // any character besides ']' or '\n'
                ),
              ),
              "]",
            ), // square-bracket-delimited character class
            seq("\\", /./), // escaped character
            /[^,=\s\\\[\n]/, // any character besides '[', '\', '\n', '=', ',', or whitespace
          ),
        ),
      ),

    // the identifier here has to be a regex-like statement because
    // its used as one in python. even a basic string is called with
    // re.search:
    // https://github.com/ranger/ranger/blob/38bb8901004b75a407ffee4b9e176bc0a436cb15/ranger/ext/rifle.py#L273-L282
    binary_condition_expression: ($) =>
      seq($.binary_condition_identifier, $._spaces, $.identifier),

    condition_expression: ($) =>
      seq(
        optional(alias("!", $.condition_negation)),
        choice($.binary_condition_expression, $.unary_condition_identifier),
      ),

    // LHS: conditions needed to run a command
    conditions: ($) =>
      seq(
        optional(repeat(choice(",", $._spaces))),
        $.condition_expression,
        // ignore repeat before, in between conditions, or trailing
        // if a condition is an empty string, its treated as True and ignored -
        // it is valid configuration
        repeat(seq(repeat1(","), $.condition_expression)),
        optional(repeat(",")),
      ),

    word: ($) => choice($.identifier, alias(/"[^"\n]*"/, $.string)),

    command: ($) =>
      prec.right(seq($.word, repeat(choice($.word, $._spaces, ";")))),

    // RHS: what gets run when all conditions are matched
    command_list: ($) =>
      choice(
        prec.left(2, alias("ask", $.ask)),
        prec.left(1, repeat1($.command)),
      ),

    // each line is like:
    // condition1, [condition2, ...] = command
    rule: ($) => seq($.conditions, "=", $.command_list, $._end_of_line),
  },
});
