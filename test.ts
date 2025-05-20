def generate_time_ranges():
    time_ranges = []
    for start in range(0, 60, 10):
        end = start + 10
        time_ranges.append(f"{start}-{end}")
    return time_ranges

# Example usage
print(generate_time_ranges())
