# node-red-node-artnet
Node-RED nodes that controls lights via artnet

## payload format

### set with array

```
msg.payload = {
  data: [0, 0, ...] // [int]: DMX data, length <= 512
};
```

### set with array and offset

```
msg.payload = {
  data: [0, ...], // [int]: DMX data, data.length <= 512
  offset: 0       // int: offset < 512, offset + data.length <= 512
};
```

### set with single value

```
msg.payload = {
  address: 1, // int: address in [0, 511]
  value: 255  // int: value in [0, 255]
};
```

### set with multiple values

```
msg.payload = {
  buckets: [
    {address: 0, value: 255},
    {address: 4, value: 0},
    ...
  ]
};
```