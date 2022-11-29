package database;

import beans.Point;

import java.util.List;

public interface PointDao {
    void save(Point point);

    boolean clear();

    List<Point> getAll();
}
