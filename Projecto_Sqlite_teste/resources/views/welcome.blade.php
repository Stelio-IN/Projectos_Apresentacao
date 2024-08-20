<!-- resources/views/welcome.blade.php -->

<!DOCTYPE html>
<html>
<head>
    <title>Welcome</title>
</head>
<body>
    <h1>Welcome to Your Application</h1>

    <ul>
        <li><a href="{{ route('items.index') }}">Listar Itens</a></li>
        <li><a href="{{ route('items.store') }}">Criar Novo Item</a></li>
        <li><a href="{{ route('items.update', ['id' => 1]) }}">Atualizar Item</a></li>
        <li><a href="{{ route('items.destroy', ['id' => 1]) }}">Excluir Item</a></li>
    </ul>
</body>
</html>


