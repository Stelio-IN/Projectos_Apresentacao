<!DOCTYPE html>
<html>
<head>
    <title>Edit Item</title>
</head>
<body>
    <h1>Edit Item</h1>
    <form action="{{ route('items.update', $item['id']) }}" method="POST">
        @csrf
        @method('PUT')
        <label>Name:</label>
        <input type="text" name="name" value="{{ $item['name'] }}" required>
        <label>Description:</label>
        <input type="text" name="description" value="{{ $item['description'] }}" required>
        <button type="submit">Save</button>
    </form>
</body>
</html>
