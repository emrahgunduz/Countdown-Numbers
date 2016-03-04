String.prototype.paddingLeft = function ( paddingValue ) {
  return String( paddingValue + this ).slice( -paddingValue.length );
};

Array.prototype.unique = function () {
  var seen = {};
  var out = [];
  var len = this.length;
  var j = 0;
  for ( var i = 0; i < len; i++ ) {
    var item = this[ i ];
    if ( seen[ item ] !== 1 ) {
      seen[ item ] = 1;
      out[ j++ ] = item;
    }
  }
  return out;
};

Array.prototype.clone = function () {
  return this.slice( 0 );
};

Array.prototype.position = function ( obj ) {
  var i = this.length;
  while ( i-- ) {
    if ( this[ i ] === obj ) {
      return i;
    }
  }
  return -1;
};

Array.prototype.moveToEnd = function ( oldObject ) {
  var oldIndex = this.position( oldObject );
  var newIndex = this.length - 1;

  if ( newIndex >= this.length ) {
    var k = newIndex - this.length;
    while ( (k--) + 1 ) {
      this.push( undefined );
    }
  }
  this.splice( newIndex, 0, this.splice( oldIndex, 1 )[ 0 ] );
};

function Calculate ( args ) {
  var solution = 0;
  var sols = [];
  var numbers = [];
  var operations = [];
  var jobs = [];

  var printSolutions = function () {

    var printS = function ( job ) {
      var n = job[ 0 ];
      var m = job[ 1 ];

      return n.reduce( function ( a, b, i ) {
        a = a.toString().trim();
        switch ( m[ i - 1 ] ) {
          case 0:
            return "(" + a + " + " + b + ") ";
            break;
          case 1:
            return "(" + a + " - " + b + ") ";
            break;
          case 2:
            return "(" + a + " * " + b + ") ";
            break;
          case 3:
            return "(" + a + " / " + b + ") ";
            break;
        }
      } );
    };

    if ( !sols.length ) {
      console.log( "No solutions were found" );
    }

    for ( var j = 0; j < sols.length; j++ ) {
      console.log( printS( sols[ j ] ) );
      // console.log( "console.log( " + printS( sols[ j ] ) + ");" );
    }
  };

  var solveJobs = function () {

    var calculate = function ( job ) {
      var n = job[ 0 ];
      var m = job[ 1 ];

      return n.reduce( function ( a, b, i ) {
        switch ( m[ i - 1 ] ) {
          case 0:
            return a + b;
            break;
          case 1:
            return a - b;
            break;
          case 2:
            return a * b;
            break;
          case 3:
            return a / b;
            break;
        }
      } );
    };

    for ( var j = 0; j < jobs.length; j++ ) {
      var job = jobs[ j ];
      var answer = calculate( job );
      if ( answer == solution ) sols.push( job );
    }

    sols = sols.unique();
  };

  var generateJobs = function () {

    var jobMaker = function ( i ) {
      var oper = operations[ i ].clone();
      var o = oper[ 1 ].clone();

      var counter = 0;
      var stop = false;
      do {
        if ( counter ) {
          var a = ((parseInt( o.join( "" ), 4 )) + 1).toString( 4 );
          var b = (new Array( o.length + 1 )).join( "0" );
          var c = a.paddingLeft( b );
          o = c.split( "" ).map( function ( m ) {
            return parseInt( m )
          } );
          var r = o.reduce( function ( m, n ) {
            return m + n;
          } );
          if ( !r ) {
            stop = true;
          } else {
            oper[ 1 ] = o;
          }
        }
        counter++;
        if ( !stop ) {
          jobs.push( oper.clone() );
        }
      } while ( !stop );
    };

    for ( var j = 0; j < operations.length; j++ ) {
      jobMaker( j );
    }
  };

  var generateOpers = function () {

    var operMaker = function ( i ) {
      var nNumbers = numbers.clone();
      var first = nNumbers[ i ];
      nNumbers.moveToEnd( first );
      var oper = [];
      for ( var j = 0; j < nNumbers.length; j++ ) {
        oper.push( 0 );
      }
      oper.pop();
      operations.push( [ nNumbers, oper ] );
    };

    for ( var j = 0; j < numbers.length; j++ ) {
      operMaker( j );
    }
  };

  var assignVariables = function () {
    if ( !args.length ) {
      console.log( "No numbers? What do you want me to do then?" );
      return;
    }
    if ( args.length == 1 ) {
      console.log( "How the hell am I going to find an answer without no numbers?" );
      return;
    }

    for ( var i = 0; i < args.length; i++ ) {
      if ( i == 0 ) {
        solution = parseInt( args[ i ] );
      } else {
        numbers.push( parseInt( args[ i ] ) );
      }
    }

    console.log( "Working for solution", solution );
    generateOpers();
    generateJobs();
    solveJobs();
    printSolutions();
  };

  assignVariables();
}


var args = process.argv.slice( 2 );
Calculate( args );