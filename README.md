# Chart Library Prototype

## Usage

```typescript
const Example = () => {
  return (
    <Plot width={400} height={300}>
      <AreaSeries
        data={[
          { x: 10, y: 20 },
          { x: 20, y: 30 },
          { x: 30, y: 50 },
          { x: 40, y: 80 },
          { x: 50, y: 70 },
          { x: 60, y: 90 },
          { x: 70, y: 100 },
        ]}
      />
      <LineSeries
        data={[
          { x: 10, y: 80 },
          { x: 20, y: 90 },
          { x: 30, y: 100 },
          { x: 40, y: 80 },
          { x: 50, y: 90 },
          { x: 60, y: 70 },
          { x: 70, y: 90 },
        ]}
      />
      <ScatterSeries
        data={[
          { x: 10, y: 120 },
          { x: 20, y: 130 },
          { x: 30, y: 150 },
          { x: 40, y: 140 },
          { x: 50, y: 130 },
          { x: 60, y: 150 },
          { x: 70, y: 130 },
        ]}
      />
      <XAxis />
      <YAxis />
    </Plot>
  );
};
```

![Screenshot](/screenshots/screenshot.png?raw=true 'Screenshot')
