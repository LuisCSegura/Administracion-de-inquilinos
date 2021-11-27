@extends('layouts.app')

@section('content')
<script type="text/javascript">
    const logged = @json(auth()->user());
</script>
<div class="container">
    <div id='home'></div>
</div>
@endsection
