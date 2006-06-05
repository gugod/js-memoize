#!/usr/bin/perl
use strict;
use Module::Build::JSAN;

my $build = Module::Build::JSAN->new(
    module_name    => 'Memoize',
    license        => 'perl',
    dist_author    => 'Kang-min Liu <gugod@gugod.org>',
    dist_abstract  => 'Make functions faster by trading space for time',
    dist_version   => '0.01',
    keywords       => [qw(memoize)],
    requires     => {
        'JSAN'     => 0.10
    },
);

$build->create_build_script;
