```java
public interface Node {
	Collection<Node> getChildren();
	long getValue();
}
```

```java
public class NodeValueSumCalculator extends RecursiveTask<Long>{

	private Node node;

	public NodeValueSumCalculator(Node node) {
		this.node = node;
	}

	@Override
	protected Long compute() {
		long sum = node.getValue();
		List<NodeValueSumCalculator> taskList = new ArrayList<>();
		for (Node child : node.getChildren()) {
			NodeValueSumCalculator task = new NodeValueSumCalculator(child);
			task.fork();
			taskList.add(task);
		}

		for (NodeValueSumCalculator task : taskList) {
			sum += task.join();
		}

		return sum;
	}
}
```

```java
Main

Node root = null;
long sum = new ForkJoinPool().invoke(new NodeValueSumCalculator(root));
```