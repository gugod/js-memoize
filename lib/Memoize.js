/**

=head1 NAME

Memoize - Make functions faster by trading space for time

=head1 SYNOPSIS

  JSAN.use('Memoize');

  memoize(slow_function);
  slow_function(arguments);    # Is faster than it was before

=head1 DESCRIPTION

This library implements the javscript version of Perl module Memoize, see
L<http://search.cpan.org/dist/Memoize/> for concept about that. The name
`Memoize' is given by the module author, Mark Jason Dominus.

`Memoizing' a function makes it faster by trading space for time. It does this
by caching the return values of the function in a table. If you call the
function again with the same arguments, memoize jumps in and gives you the
value out of the table, instead of letting the function compute the value all
over again.

=head1 METHODS

=over 4

=back

=item memoize()

This is the only function you should be calling. It takes one argument, the
original function to be memoized, and the return the memoized version of that
function.. It must be given as a function reference, like this:

  var f = function() {
      ...
  };
  f = memoized(f)

Or like this:

  var f = memoize(function() {
      ...
  });

Please be aware that, the "this" keyword inside the memoized function
always refer to a null object. Which means you cannot just memoized
an object method directly, instead, do something like this:

  var obj = new SomeObject();
  var f = function() {
    obj.slow_method()
  }
  f = memoize(f)
  // Use f to call obj.slow_method()

Which means, unlike Perl's Memoize module, the callers to the memoized function
require to be modified to call the memoized function.

It is possible to use C<apply()> or C<call()> to simplify this snippet,

=cut

*/

if ( typeof Memoize == 'undefined' ) {
    Memoize = function() {}
}

Memoize.VERSION = 0.01
Memoize.EXPORT  = [ 'memoize' ]
Memoize.EXPORT_TAGS = { ':all': Memoize.EXPORT }
Memoize.memoized = {}

Memoize.memoize = function(func) {
    if ( typeof func == 'function' ) {
        return function() {
            var memo = Memoize.the(func);
            var normalized_arg = Memoize.normalize( arguments );
            if ( typeof memo.cached_args[normalized_arg] == 'undefined') {
                memo.cached_args[normalized_arg] = memo["orig_function"].apply(null, arguments);
            }
            return memo.cached_args[normalized_arg]
        }
    }
}

Memoize.the = function(func) {
    if ( typeof Memoize.memoized[func] == 'undefined') {
        var memo = Memoize.memoized[func] = new Memoize();
        memo.orig_function = func
        memo.cached_args = {}
    }
    return Memoize.memoized[func]
}

Memoize.normalize= function(arg) {
    return Memoize.default_normzlier(arg)
}

Memoize.default_normzlier = function(arg) {
    var result = "";
    var separator = " ; ";
    for (var i = 0; i < arg.length; i++) {
        result += arg[i] + separator;
    }
    return result;
}

/**

=head1 AUTHOR

Kang-min Liu <F<gugod@gugod.org>>.
 
=head1 COPYRIGHT

Copyright 2006 by Kang-min Liu <gugod@gugod.org>.

This program is free software; you can redistribute it and/or
modify it under the same terms as Perl itself.

See <http://www.perl.com/perl/misc/Artistic.html>

=cut

*/
